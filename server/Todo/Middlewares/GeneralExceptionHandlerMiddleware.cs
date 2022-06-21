using Newtonsoft.Json;

namespace Todo.Middlewares
{
    public class GeneralExceptionHandlerMiddleware
    {
        protected RequestDelegate Next { get; }

        // protected ILogger Logger { get; }

        public GeneralExceptionHandlerMiddleware(
            RequestDelegate next
            //ILogger logger
            )
        {
            Next = next;
            //  Logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await Next(context);
            }
            catch (Exception ex)
            {
                //  Logger.LogError($"{ex.Message}: {ex.StackTrace}");
                context.Response.Clear();
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonConvert.SerializeObject(ex.Message));
            }
        }
    }
}
