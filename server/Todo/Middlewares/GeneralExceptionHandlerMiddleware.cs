using Newtonsoft.Json;

namespace Todo.Middlewares
{
    public class GeneralExceptionHandlerMiddleware
    {
        protected RequestDelegate Next { get; }

        public GeneralExceptionHandlerMiddleware(RequestDelegate next)
        {
            Next = next ?? throw new ArgumentNullException(next.GetType().ToString());
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await Next(context);
            }
            catch (Exception ex)
            {
                context.Response.Clear();
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonConvert.SerializeObject(ex.Message));
            }
        }
    }
}
