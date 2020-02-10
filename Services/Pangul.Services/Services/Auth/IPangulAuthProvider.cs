using System.Threading.Tasks;

namespace Pangul.Services.Services.Auth
{
    public interface IPangulAuthProvider
    {
        /// <summary>
        /// Given a username and an arbitrary implementation specific authorization token,
        /// attempt to find an authorization provider which will accept the given user.
        /// If a session has to be configured or some other token returned, use the context.
        /// </summary>
        /// <param name="username">The username</param>
        /// <param name="authenticationToken">The token; eg, password hash, etc</param>
        /// <param name="authenticationContext">Whatever arbitrary context is required</param>
        /// <returns></returns>
        Task<bool> TryAuthorize<TAuth, TContext>(string username, TAuth authenticationToken, TContext authenticationContext);
    }
}