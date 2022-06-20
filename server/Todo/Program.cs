using Application.Common;
using Domain.Repositories;
using Domain.Seeds;
using Infrastructure;
using Infrastructure.Context;
using Infrastructure.Todos.MappingProfiles;
using Infrastructure.Todos.Storage;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var assemblies = new[] { typeof(IApplication).Assembly };


builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddMediatR(assemblies);
builder.Services.AddControllers();
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

//app.UseHttpsRedirection();

app.UseCors("AnyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
