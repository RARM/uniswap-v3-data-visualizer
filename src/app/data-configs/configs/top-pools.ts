import { ConfigModuleInterface, QueryType } from "@/app/lib/definitions";
import { UISection } from "@/app/ui/ui-controller";

const TopPoolsConfig: ConfigModuleInterface = {
  queryType: QueryType.GraphQL,
  query_filename: 'top-pools.graphql',
  requirements: ["subgraph_api"],
  
  URL: () => {
    return {
      URL: `https://gateway.thegraph.com/api/${ process.env.SUBGRAPH_KEY }/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`
    }
  },

  connectionLogic: (json_queried_values: any) : UISection => {
    let pools = json_queried_values.data.pools;
    const deciamls = 2;
    
    let uiDescription: UISection = {
      heading: 'Top Pools',
      description: 'The top 10 pools by Total Value Locked (TVL).',
      components: [
        {
          component: 'HorizontalBar',
          props: {
            values: pools.map((pool: any) => {
                return {
                label: pool.id,
                value: parseFloat(pool.totalValueLockedUSD).toFixed(deciamls)
                }
            }),
            values_symbol: '$',
            x_label: 'Total Value Locked (USD)',
            y_label: 'Pool ID',
          }
        },
        {
          component: 'Table',
          props: {
            headings: [
              { text: 'Pool ID', tooltip: 'The ID of the pool.' },
              { text: 'Token 0' },
              { text: 'Token 1' },
              { text: 'VolumeUSD', tooltip: 'The volume of the pool in USD.' },
              { text: 'TLV (USD)', tooltip: 'The total value locked in USD.' }
            ],
            entries: pools.map((pool: any) => {
              return [
                { text: pool.id },
                { text: pool.token0.symbol },
                { text: pool.token1.symbol },
                { text: parseFloat(pool.volumeUSD).toFixed(deciamls) },
                { text: parseFloat(pool.totalValueLockedUSD).toFixed(deciamls) }
              ]
            })
          }
        }
      ]
    };

    return uiDescription;
  }
};

export default TopPoolsConfig;