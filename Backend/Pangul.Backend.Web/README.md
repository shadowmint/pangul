# Migrations

## Reset all migrations

    rm Migrations/*
    rm data.sqlite
    dotnet ef migrations add Initial
    dotnet ef database update
