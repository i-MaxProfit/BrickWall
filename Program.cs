using Microsoft.EntityFrameworkCore;
using DAL;
using DAL.Repositories;
using DAL.Repositories.Interfaces;
using Services.Interfaces;
using Services;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllersWithViews();

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString, b => b.MigrationsAssembly("BrickWall")));

        builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        // Business Services
        builder.Services.AddScoped<IBrickTypeService, BrickTypeService>();
        builder.Services.AddScoped<IBrickOptionService, BrickOptionService>();

        // Repositories
        builder.Services.AddScoped<IBrickTypeRepository, BrickTypeRepository>();
        builder.Services.AddScoped<IBrickOptionRepository, BrickOptionRepository>();

        // DB Creation and Seeding
        builder.Services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();

        var app = builder.Build();

        SeedDatabase(app);

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();


        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");

        app.MapFallbackToFile("index.html"); ;

        app.Run();
    }

    private static void SeedDatabase(WebApplication app)
    {
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var databaseInitializer = services.GetRequiredService<IDatabaseInitializer>();
            databaseInitializer.SeedAsync().Wait();
        }
    }
}
