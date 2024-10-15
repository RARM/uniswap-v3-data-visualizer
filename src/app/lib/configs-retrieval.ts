import { 
  ConfigRetrievalInterface,
  ConfigModuleInterface,
  RequirementCheck
} from './definitions';
import { UISection } from '@/app/ui/ui-controller';
import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';

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

  private sendRequest(URL: string, body: string): any {
    // FIXME: Add extraData support.
    // FIXME: Consider other request methods.
    // FIXME: Add other data construction methods.
    return new Promise((resolve, reject) => {
      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: body
        })
      })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      });
    });
  }

  private checkRequirements(mod: ConfigModuleInterface, requirements: Array<RequirementCheck>): boolean {
    return mod.requirements.every((req) => {
      return requirements.some((reqCheck) => {
        return reqCheck.name === req && reqCheck.fulfilled;
      });
    });
  }

  private getQueryBody(module: ConfigModuleInterface): string { // FIXME: Manage different setups.
    let query = fs.readFileSync(path.resolve('src/app/data-configs/queries', module.query_filename)).toString();
    return query;
  }

  private organizeUISectionbyOrder(ui_sections: Array<UISection>): Array<UISection> {
    return ui_sections.sort((a: UISection, b: UISection) => {
      return a.order - b.order;
    });
  }

  getUISections(requirements: Array<RequirementCheck>): Promise<Array<UISection>> {
    return new Promise((resolve, reject) => {
      this.configModules.then((configModules) => {        
        let ui_sections: Array<UISection> = [];

        const requests = configModules.map(async (module) => {
          if (this.checkRequirements(module, requirements)) {
            let body = this.getQueryBody(module);

            const json_queried_values = await this.sendRequest(module.URL().URL, body); // FIXME: Add extraData support.
            let ui_desc = module.connectionLogic(json_queried_values);

            ui_sections.push(ui_desc);
          }
        });

        Promise.all(requests).then(() => {
          ui_sections = this.organizeUISectionbyOrder(ui_sections);
          resolve(ui_sections);
        }).catch(reject => {
          // FIXME: What happens when a request fails?
        });
      });
    });
  }
}