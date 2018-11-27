# setup

    npm ci
    npm start

## build

    npm ci
    npm run build
    rm -r ../../Backend/Pangul.Backend.Web/wwwroot
    mkdir ../../Backend/Pangul.Backend.Web/wwwroot
    cp -r build/* ../../Backend/Pangul.Backend.Web/wwwroot/
