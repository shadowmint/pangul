import ProviderSingleton from "../infrastructure/providers/providerSingleton";
import IFetch from "../interfaces/fetch";

export const FetchProvider = new ProviderSingleton<IFetch>(null);
