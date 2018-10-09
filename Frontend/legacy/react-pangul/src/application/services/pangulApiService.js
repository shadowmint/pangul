import {BackendFetch} from './internal/backendFetch';
import {LocalAssets} from './apis/staticAssets';
import {AuthController} from './apis/authController';
import {AdminDbController} from './apis/adminDbController';
import LoggerProvider from '../../domain/infrastructure/loggerProvider';
import FetchProvider from '../../domain/infrastructure/fetchProvider';

export class PangulApiService {
  constructor(logger) {
    this.fetch = new BackendFetch();
    this.config = null;
    this.assets = new LocalAssets();
    this.auth = new AuthController(this.fetch, logger);
    this.db = new AdminDbController(this.fetch, logger);
    this.logger = logger;
  }

  configure(config) {
    this.config = config;
    this.fetch.backend = config.backend;
    LoggerProvider.configure(this.logger);
    FetchProvider.configure(this.fetch);
  }
}
