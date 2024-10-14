import { 
  ConfigRetrievalInterface,
  ConfigModuleInterface,
  RequirementCheck
} from './definitions';
import { UISection } from '@/app/ui/ui-controller';
import * as fs from 'fs';
import * as path from 'path';

export default class ConfigRetrieval implements ConfigRetrievalInterface {
  private configModules: Promise<ConfigModuleInterface[]>;
  private moduleNames: string[] = [];
  private dir_path: string = '';

  constructor(dir_path: string = 'src/app/data-configs/configs') {
    this.dir_path = dir_path;
    this.configModules = this.getQueriesConfig();
  }

  private async getQueriesConfig(): Promise<ConfigModuleInterface[]> {
    this.moduleNames = this.getConfigModuleNames();
    let configModules: ConfigModuleInterface[] = [];
    
    for (const moduleName of this.moduleNames) {
      const module = (await import('@/app/data-configs/configs/' + moduleName + '.ts')).default as ConfigModuleInterface;
      configModules.push(module);
    }

    return configModules;
  }

  private getConfigModuleNames(): string[] {
    const files = fs.readdirSync(this.dir_path).map(file => path.parse(file).name);
    return files;
  }

  getUISections(requirements: Array<RequirementCheck>): Promise<Array<UISection>> {
    let ui_sections: Array<UISection> = [];

    // console.log('ConfigPaths:', this.paths);

    return ui_sections;
  }
}