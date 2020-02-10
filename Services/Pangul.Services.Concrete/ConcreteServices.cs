using System.Diagnostics;
using System.Reflection;

namespace Pangul.Services.Concrete
{
    public static class ConcreteServices
    {
        public static void RegisterAssemblyForDiscovery()
        {
            var here = Assembly.GetExecutingAssembly().FullName;
            Debug.WriteLine($"Registered assembly for discovery: {here}");
        }
    }
}