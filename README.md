# Pangul

A simple Q&A site in .Net Core and React.

## status

This is a work in progress.

Should be usable for small numbers of users for simple purposes.

## quickstart

    cd Snapshot
    dotnet Pangul.Backend.Web.dll

To customize, modify `appsettings.json` and `wwwroot/config.json`

## dev

    sh server.sh
    sh client.sh

(hint: on windows use git bash)

### 1.0.0

- site in now basically feature complete and can be used for dog fooding.
- users are hard coded into [ServiceAuthentication.cs](https://github.com/shadowmint/pangul/blob/master/Backend/Pangul.Backend.Web/Configuration/Authentication/Identity/ServiceAuthentication.cs) for now.
- deployment & builds as a single unified project still WIP
- only runs with sqlite
