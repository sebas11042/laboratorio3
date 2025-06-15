using Lab3ApiCursos.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Agregar el DbContext con conexión a SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuración para evitar ciclos de referencia al serializar JSON
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000") // tu frontend local
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});


// También se pueden usar vistas si querés Razor en el futuro
builder.Services.AddControllersWithViews();

var app = builder.Build();

// 🔥 Esta línea permite que Render sepa en qué puerto escuchar
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Urls.Add($"http://*:{port}");

// Mostrar detalles de errores en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);


app.UseAuthorization();

// API routes
app.MapControllers();

// Redirigir cualquier ruta no encontrada a index.html (SPA/Frontend)
app.UseDefaultFiles();
app.UseStaticFiles();


app.Run();
