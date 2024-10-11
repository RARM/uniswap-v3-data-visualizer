import { ConfigRetrievalInterface, ConfigModuleInterface } from './definitions';

export default class ConfigRetrieval implements ConfigRetrievalInterface {
  private configModules: ConfigModuleInterface[] = [];
  private paths: string[] = [];

  getQueriesConfig(): ConfigModuleInterface[] {
    return this.configModules;
  }

  addConfigPath(path: string): void {
    this.paths.push(path);
  }

  getConfigPath(): string[] {
    return this.paths;
  }
}