using Microsoft.Extensions.Logging;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using DAL.Repositories;

namespace DAL
{
    public class DatabaseInitializer : IDatabaseInitializer
    {
        readonly ApplicationDbContext _context;
        readonly ILogger _logger;

        public DatabaseInitializer(ApplicationDbContext context, ILogger<DatabaseInitializer> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task SeedAsync()
        {
            await _context.Database.MigrateAsync().ConfigureAwait(false);
            await SeedDefaultBrickTypes();
        }

        private async Task SeedDefaultBrickTypes()
        {
            if (!await _context.BrickTypes.AnyAsync())
            {
                _logger.LogInformation("Generating inbuilt BrickTypes");

                BrickOption brickOption1 = new BrickOption
                {
                    BrickType = new BrickType()
                    {
                        Name = "Облицовочный кирпич",
                        CreationDate = DateTime.UtcNow
                    },
                    Height = 65,
                    Width = 250,
                    CountOnPalette = 275,
                    Price = 65,
                    Weight = 3.4M,
                    CreationDate = DateTime.UtcNow
                };
                _context.BrickOptions.Add(brickOption1);

                BrickOption brickOption2 = new BrickOption
                {
                    BrickType = new BrickType()
                    {
                        Name = "Полуторный кирпич",
                        CreationDate = DateTime.UtcNow
                    },
                    Height = 105,
                    Width = 270,
                    CountOnPalette = 205,
                    Price = 95,
                    Weight = 4.9M,
                    CreationDate = DateTime.UtcNow
                };
                _context.BrickOptions.Add(brickOption2);

                BrickOption brickOption3 = new BrickOption
                {
                    BrickType = new BrickType()
                    {
                        Name = "Силикатный блок",
                        CreationDate = DateTime.UtcNow
                    },
                    Height = 225,
                    Width = 400,
                    CountOnPalette = 85,
                    Price = 285,
                    Weight = 18.3M,
                    CreationDate = DateTime.UtcNow
                };
                _context.BrickOptions.Add(brickOption3);

                await _context.SaveChangesAsync();

                _logger.LogInformation("Inbuilt BrickTypes generation completed");
            }
        }
    }
}
