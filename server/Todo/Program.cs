using Application.Common;
using Domain.Repositories;
using Infrastructure.Context;
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

var context = app.Services.GetService<AppDbContext>();
//AddTestData(context);

//app.UseHttpsRedirection();

app.UseCors("AnyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
