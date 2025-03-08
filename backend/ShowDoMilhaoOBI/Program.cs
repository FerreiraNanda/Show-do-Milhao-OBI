using Microsoft.EntityFrameworkCore;
using ShowDoMilhaoOBI.Context;
using ShowDoMilhaoOBI.Domain.Repositories;
using ShowDoMilhaoOBI.Repositories;
using ShowDoMilhaoOBI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add Swagger/OpenAPI support for development
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure database connection (MySQL in your case)
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(op =>
{
    op.UseMySql(connection, ServerVersion.AutoDetect(connection));
});

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapping));

// Register repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddScoped<IGameRepository, GameRepository>();

// Configure CORS policy to allow only localhost:3000
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy => policy.WithOrigins("http://localhost:3000")  // Permit only requests from localhost:3000
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Ensure the database is created
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS
app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
