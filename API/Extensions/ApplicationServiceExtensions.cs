using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Interfaces;
using API.Services;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
          public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)

        {
        services.AddDbContext<DataContext>(opt => 
        {
            opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
        });

        /* builder.Services.AddCors();
        builder.Services.AddScoped<ITokenService, TokenService>();
        builder.Services.AddApplicationServices(builder.Configuration);
        builder.Services.AddIdentityServices(builder.Configuration);
        */
        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
         services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        return services;

        }
     
        
    }
}