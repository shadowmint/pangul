# Pangul

Pangul mega-project.

...

# Initial setup

    edit setup.sh
    edit package.json

Now run the scaffolds:

    ./setup.sh

Add the packages folder to make nuget happy:

    git add -f ./packages/.gitkeep

You may also want to edit the .csproj of the library file and put a real version specifier in it:

    <PropertyGroup>
      <TargetFramework>netstandard2.0</TargetFramework>
      <VersionPrefix>0.0.1</VersionPrefix> <--- This
    </PropertyGroup>

# Installing

    npm install --save shadowmint/core-TEMPLATE

This will install the package in the `_packages` folder.

Now add the `NuGet.Config` to the project folder:

    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
     <packageSources>
        <add key="local" value="./_packages" />
     </packageSources>
    </configuration>

Now you can install the package:

    dotnet add package TEMPLATE

Note that nuget will prefer your global package cache to the actual version in your packages folder be design.

You may want to use `dotnet nuget locals all --clear` to clear cached objects.

Requires npm >= 5.4 to install correctly.

# Building a new package version

    npm run build

# Testing

    npm test
