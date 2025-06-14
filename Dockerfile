﻿# Etapa de construcción
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar csproj y restaurar dependencias
COPY *.csproj ./
RUN dotnet restore

# Copiar todo y compilar
COPY . ./
RUN dotnet publish -c Release -o out

# Imagen final
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Puerto de la app
EXPOSE 80

ENTRYPOINT ["dotnet", "Lab3ApiCursos.dll"]
