HERE=`pwd`

echo "Building from: ${HERE}"

# Cleanup
echo "Removing old snapshot"
cd ${HERE}
rm -r Snapshot/bin

# Backend
echo "Building backend"
cd ${HERE}
dotnet clean
dotnet build -c Release

# Frontend
echo "Building frontend"
cd ${HERE}/Frontend/react-pangul/
npm install
npm run build
rm -r ../../Backend/Pangul.Backend.Web/wwwroot
mkdir ../../Backend/Pangul.Backend.Web/wwwroot
cp -r build/* ../../Backend/Pangul.Backend.Web/wwwroot/

# Deployment snapshot
echo "Building snapshot"
cd ${HERE}/Backend/Pangul.Backend.Web
dotnet publish -o ../../Snapshot/bin -c Release
