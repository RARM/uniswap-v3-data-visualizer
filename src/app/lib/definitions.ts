import { UISection } from "@/app/ui/ui-controller";

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
 * Represents a request for querying data.
**/
type QueryRequest = {
  /**
   * The URL to send the query request to.
  **/
  URL: string;

  /**
   * (Optional) Additional data to include in the query request.
  **/
  extraData?: { [key: string]: string };
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
   * The requirements needed to make the query.
   * @see RequirementCheck
  **/
  requirements: Array<string>;

  /**
   * Construct the request URL plus any extra data for the query.
   * @returns {QueryRequest} The URL and extra data for the query.
  **/
  URL: () => QueryRequest;

  /**
   * Defines how to connect the expected values and the UI component that renders it.
   * @param json_queried_values The queried values from the data source.
   * @returns {UISection} The UI section to be rendered.
  **/
  connectionLogic: (json_queried_values: any) => UISection;
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

// FIXME: Work for future refactoring. Implement dynamic importing of UI components.
// /**
//  * Interface for UI component definition.
// **/
// export interface UIComponentInterface {
//   /**
//    * The title of the UI component serving as a key to access it.
//   **/
//   title: string;

//   /**
//    * React funtional component.
//   **/
//   component: React.FC<any>;

//   /**
//    * Type definition of expected parameter of component.
//   **/
//   typeDefinition: string;
// }