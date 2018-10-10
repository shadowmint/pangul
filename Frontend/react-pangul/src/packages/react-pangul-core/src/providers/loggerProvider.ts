import ProviderFactory from "../infrastructure/providers/providerFactory";
import ILogger from "../interfaces/logger";

export const LoggerProvider = new ProviderFactory<ILogger>(null);
