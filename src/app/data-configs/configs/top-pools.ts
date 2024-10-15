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
      heading: 'Top 10 Pools',
      description: 'The top 10 pools by Total Value Locked (TVL).',
      order: 1,
      components: [
        {
          component: 'HorizontalBar',
          props: {
            values: pools.map((pool: any) => {
                return {
                label: `...${pool.id.slice(-6)}`,
                value: (parseFloat(pool.totalValueLockedUSD) / 1000000000).toFixed(deciamls)
                }
            }),
            values_symbol: '$ (Billions)',
            x_label: 'Total Value Locked (USD in Billions)',
            y_label: 'Pool ID',
            isLogScale: true
          }
        },
        {
          component: 'Table',
          props: {
            headings: [
              { text: 'Pool ID', tooltip: 'The ID of the pool.' },
              { text: 'Token 1' },
              { text: 'Token 2' },
              { text: 'VolumeUSD', tooltip: '24-hour trading volume in USD.' },
              { text: 'TVL (USD)', tooltip: 'The total value locked in USD.' }
            ],
            entries: pools.map((pool: any) => {
                return [
                { text: `...${pool.id.slice(-6)}`, tooltip: pool.id },
                { text: pool.token0.symbol, tooltip: pool.token0.name },
                { text: pool.token1.symbol, tooltip: pool.token1.name },
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