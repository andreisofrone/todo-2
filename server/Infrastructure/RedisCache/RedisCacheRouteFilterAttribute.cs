using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace Infrastructure.RedisCache
{

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
    public class RedisCacheRouteFilterAttribute
        : TypeFilterAttribute
    {
        public RedisCacheRouteFilterAttribute(int validity, string key = null)
            : base(typeof(CacheAttribute))
        {
            Arguments = new object[] { key ?? string.Empty, validity };
        }

        private class CacheAttribute
            : ActionFilterAttribute
        {
            private string Key { get; set; }

            private int Validity { get; set; }

            private IDistributedCache Cache { get; }

            public CacheAttribute(IDistributedCache cache, string key, int validity)
            {
                Cache = cache ?? throw new ArgumentNullException(nameof(cache));
                Key = key;
                Validity = validity;
            }

            //GET THE RESULT FROM REDIS BY KEY
            public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
            {
                // MOVE THIS AT THE END TO ADD REDIS
                await base.OnActionExecutionAsync(context, next);

                var queryKey = Key == string.Empty ? $"{context.HttpContext.Request.Path}{context.HttpContext.Request.QueryString.Value}" : Key;

                try
                {
                    string valueFromCache = await Cache.GetStringAsync(queryKey);
                    if (valueFromCache != null)
                    {
                        var deserialized = JsonConvert.DeserializeObject<OkObjectResult>(valueFromCache, new JsonSerializerSettings());

                        if (deserialized.StatusCode == 404)
                            context.Result = new NotFoundResult();

                        context.Result = deserialized;
                        return;
                    }
                }
                catch (Exception ex)
                {
                    
                }

            }

            // SET THE RESULT IN REDIS 
            public override void OnActionExecuted(ActionExecutedContext context)
            {
                // MOVE THIS AT THE END TO ADD REDIS
                base.OnActionExecuted(context);

                var queryKey = Key == string.Empty ? $"{context.HttpContext.Request.Path}{context.HttpContext.Request.QueryString.Value}" : Key;

                try
                {
                    Cache.SetString(queryKey, JsonConvert.SerializeObject(context.Result, new JsonSerializerSettings()),
                        new DistributedCacheEntryOptions() { AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(Validity) });
                }
                catch (Exception ex)
                {
                }

            }
        }
    }
}
