using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace Todo.Middlewares
{
    public class FluentValidationExceptionHandlerMiddleware
    {
        protected RequestDelegate Next { get; }

        public FluentValidationExceptionHandlerMiddleware(RequestDelegate next)
        {
            Next = next ?? throw new ArgumentNullException(next.GetType().ToString());
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await Next(context);
            }
            catch (DataValidationException ex)
            {
                context.Response.Clear();
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonConvert.SerializeObject(ex.Errors));
            }
        }

    }
}
