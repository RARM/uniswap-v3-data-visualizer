import { ConfigModuleInterface, QueryType } from "../lib/definitions";

let TopPoolsConfig: ConfigModuleInterface = {
  queryType: QueryType.GraphQL,
  path: '@/app/data-configs/queries/top-pools.graphql',

};

export default TopPoolsConfig;