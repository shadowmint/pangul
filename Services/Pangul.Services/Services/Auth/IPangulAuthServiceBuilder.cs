namespace Pangul.Services.Services.Auth
{
    public interface IPangulAuthServiceBuilder
    {
        /// <summary>
        /// Configure some 3rd party authorization provider, eg. password auth, AD, etc.
        /// </summary>
        void ConfigureProvider(IPangulAuthProvider provider);

        /// <summary>
        /// Configure the service for actual use.
        /// </summary>
        void Build(IPangulAuthService service);
    }
}