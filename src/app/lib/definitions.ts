/**
 * Type representing a requirement check.
**/
export type RequirementCheck = {
  /**
   * The name of the requirement. It is the key to access the requirement values.
  **/
  name: string;

  /**
   * The description of the requirement (optional).
  **/
  description?: string;

  /**
   * An array of values associated with the requirement (optional).
  **/
  values: Array<RequirementValue>;
}

/**
 * Type representing a value associated with a requirement.
**/
export type RequirementValue = {
  /**
   * The name of the value. It is also the key to access the value.
  **/
  name: string;

  /**
   * Indicates whether the requirement exists. In other words, if it is
   * saved in the value attribute.
  **/
  exists: boolean;

  /**
   * The expected environment value.
  **/
  env: string;

  /**
   * The description of the value (optional).
  **/
  description?: string;

  /**
   * The actual value.
  **/
  value?: any;
}

/**
 * Interface for the config retrieval object.
**/
export interface ConfigRetrievalInterface {
  /**
   * Retrieves the configuration module.
   * @returns {Array<ConfigModuleInterface>} An array of configuration modules.
  **/
  getQueriesConfig(): Array<ConfigModuleInterface>;

  /**
   * Adds path to the data config files.
   * @param path The path to the data config files.
  **/
  addConfigPath(path: string): void;

  /**
   * Retrieves the paths to the data config file.
   * @returns {Array<string>} The paths to the data config file.
   **/
  getConfigPath(): Array<string>;
}

/**
 * Interface for the config module. It defines the data needed to make the
 * query and create the UI interface for the data queried.
**/
export interface ConfigModuleInterface {
  /**
   * The type of query.
  **/
  queryType: QueryType;

  /**
   * The path for the query.
  **/
  path: string;

  /**
   * The expected values based on the query.
  **/
  expectedValues: ExpectedValues;

  /**
   * The type of UI component needed to generate the data queried.
  **/
  uiComponentType: string;

  /**
   * Defines how to connect the ExpectedValues and the UI component that renders it.
  **/
  connectionLogic: (expectedValues: ExpectedValues) => any; // FIXME: Define the return type.
}

/**
 * Enum for the type of query.
 */
export enum QueryType {
  /**
   * GraphQL query type.
  **/
  GraphQL = 'graphql',

  /**
   * REST query type.
  **/
  REST = 'rest',
}

/**
 * Interface for the expected values based on the query.
**/
export interface ExpectedValues { // FIXME: Define how the expected values should be structured.
  [key: string]: any;
}