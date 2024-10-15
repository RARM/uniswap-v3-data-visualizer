import { ConfigModuleInterface, QueryType } from "@/app/lib/definitions";
import { UISection } from "@/app/ui/ui-controller";

const TopTokensConfig: ConfigModuleInterface = {
  queryType: QueryType.GraphQL,
  query_filename: 'top-tokens.graphql',
  requirements: ["subgraph_api"],
  
  URL: () => {
    return {
      URL: `https://gateway.thegraph.com/api/${ process.env.SUBGRAPH_KEY }/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`
    }
  },

  connectionLogic: (json_queried_values: any) : UISection => {
    const tokens = json_queried_values.data.tokens;
    const deciamls = 2;
    
    const uiDescription: UISection = {
      heading: 'Top Tokens',
      description: 'The top 100 tokens by 24-hour volumen (USD).',
      order: 2,
      components: [
        {
          component: 'Table',
          props: {
            headings: [
              { text: 'Token ID' },
              { text: 'Symbol' },
              { text: 'Price Point (USD)' },
              { text: 'Price Change (USD)', tooltip: '24-hour price change.' }
            ],
            entries: tokens.map((token: any) => {
              return [
                { text: `...${token.id.slice(-6)}`, tooltip: token.id },
                { text: token.symbol, tooltip: token.name },
                { text: parseFloat(token.tokenDayData[0].priceUSD).toFixed(deciamls) },
                { text: (parseFloat(token.tokenDayData[0].priceUSD) - parseFloat(token.tokenDayData[1].priceUSD)).toFixed(deciamls) }
              ]
            })
          }
        }
      ]
    };

    return uiDescription;
  }
};

export default TopTokensConfig;