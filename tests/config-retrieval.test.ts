import {describe, expect, test, beforeEach} from '@jest/globals';
import { ConfigRetrievalInterface, ConfigModuleInterface, QueryType } from '@/app/lib/definitions';
import ConfigRetrieval from '@/app/lib/configs-retrieval';

describe('ConfigRetrieval', () => {
  let configRetrieval: ConfigRetrievalInterface;

  beforeEach(() => {
    configRetrieval = new ConfigRetrieval();
  });

  test('getQueriesConfig should return an array of ConfigModule', () => { // FIXME: Still have to work on the ConfigModuleInterface.
    const configModules: ConfigModuleInterface[] = [
      {
        queryType: QueryType.GraphQL,
        path: '/graphql',
        expectedValues: { key: 'value' },
        uiComponentType: 'GraphQLComponent',
        connectionLogic: (expectedValues) => expectedValues,
      },
    ];
    (configRetrieval as any).configModules = configModules;

    expect(configRetrieval.getQueriesConfig()).toEqual(configModules);
  });

  test('addConfigPath should add a path correctly', () => {
    const path = '/path/to/config';
    configRetrieval.addConfigPath(path);

    expect(configRetrieval.getConfigPath()).toContain(path);
  });

  test('getConfigPath should return the correct paths', () => {
    const paths = ['/path/one', '/path/two'];
    paths.forEach((path) => configRetrieval.addConfigPath(path));

    expect(configRetrieval.getConfigPath()).toEqual(paths);
  });
});