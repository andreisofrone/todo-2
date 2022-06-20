using Application.Common;
using Domain.Repositories;
using Domain.Seeds;
using FluentValidation;
//using FluentValidation.AspNetCore;
using Infrastructure;
using Infrastructure.Context;
using Infrastructure.Todos.MappingProfiles;
using Infrastructure.Todos.Storage;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Todo.Middlewares;
using Todo.Pipeline;

var builder = WebApplication.CreateBuilder(args);
var assemblies = new[] { typeof(IApplication).Assembly };


builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddMediatR(assemblies);
builder.Services.AddFluentValidation(assemblies);
//builder.Services.AddTransient<GeneralExceptionHandlerMiddleware>();
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

//builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<AnotherValidationClass>());
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("Todos"));
builder.Services.AddMvc();
builder.Services.AddAutoMapper(typeof(IInfrastructure).Assembly);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AnyPolicy", policy =>
      policy
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin());
});

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var options = new DbContextOptionsBuilder<AppDbContext>()
   .UseInMemoryDatabase(databaseName: "Todos")
   .Options;

using (var context = new AppDbContext(options))
{
    var data = TodosSeed.GetTestData();

    context.AddRangeAsync(data);
    context.SaveChanges();
}

app.UseMiddleware<GeneralExceptionHandlerMiddleware>();
app.UseMiddleware<FluentValidationExceptionHandlerMiddleware>();

app.UseCors("AnyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
