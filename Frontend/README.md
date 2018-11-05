# setup

    cd react-pangul
    npm ci
    npm start

## build

    cd react-pangul
    npm ci
    npm run build
    rm -rf ../../Backend/Pangul.Backend.Web/wwwroot
    mkdir ../../Backend/Pangul.Backend.Web/wwwroot
    cp -r build/* ../../Backend/Pangul.Backend.Web/wwwroot/
