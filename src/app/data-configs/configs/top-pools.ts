import { ConfigModuleInterface, QueryType } from "@/app/lib/definitions";

const TopPoolsConfig: ConfigModuleInterface = {
  queryType: QueryType.GraphQL,
  path: '@/app/data-configs/queries/top-pools.graphql',
  requirements: ["subgraph_api"],
  
  URL: () => {
    return {
      URL: `https://gateway.thegraph.com/api/${ process.env.SUBGRAPH_KEY }/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`
    }
  },

  // FIXME: Connection logic not completed.
  connectionLogic: (json_queried_values: any) => {
    let UISection = {
      heading: 'Top Pools',
      description: 'The top 10 pools by Total Value Locked (TVL).',
      components: [
        {
          component: 'HorizontalBar',
          props: {
            headings: [
              { text: 'Pool ID', tooltip: 'The ID of the pool' },
              { text: 'Token 0', tooltip: 'The first token in the pool' },
              { text: 'Token 1', tooltip: 'The second token in the pool' },
              { text: 'Liquidity', tooltip: 'The liquidity of the pool' }
            ],
            entries: json_queried_values.topPools.map((pool: any) => {
              return [
                { text: pool.id },
                { text: pool.token0.symbol },
                { text: pool.token1.symbol },
                { text: pool.liquidity }
              ]
            })
          }
        },
        {
          subheading: 'Top 10 pools by volume',
          component: 'Table',
          props: {
            headings: [
              { text: 'Pool ID', tooltip: 'The ID of the pool' },
              { text: 'Token 0', tooltip: 'The first token in the pool' },
              { text: 'Token 1', tooltip: 'The second token in the pool' },
              { text: 'Volume', tooltip: 'The volume of the pool' }
            ],
            entries: json_queried_values.topPools.map((pool: any) => {
              return [
                { text: pool.id },
                { text: pool.token0.symbol },
                { text: pool.token1.symbol },
                { text: pool.volume }
              ]
            })
          }
        }
      ]
    };

    return UISection;
  }
};

export default TopPoolsConfig;