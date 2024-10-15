import { ConfigModuleInterface, QueryType } from "@/app/lib/definitions";
import { UISection } from "@/app/ui/ui-controller";

const LatestTransactionsConfig: ConfigModuleInterface = {
  queryType: QueryType.GraphQL,
  query_filename: 'latest-transactions.graphql',
  requirements: ["subgraph_api"],
  
  URL: () => {
    return {
      URL: `https://gateway.thegraph.com/api/${ process.env.SUBGRAPH_KEY }/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`
    }
  },

  connectionLogic: (json_queried_values: any) : UISection => {
    let transactions = json_queried_values.data.transactions;
    const decimals = 2;
    
    let uiDescription: UISection = {
      heading: 'Latest Transactions',
      description: 'The latest 20 transactions.',
      order: 3,
      components: [
        {
          component: 'Table',
          props: {
            headings: [
              { text: 'Transaction ID' },
              { text: 'Total Value' },
              { text: 'Amount Token 0' },
              { text: 'Amount Token 1' },
              { text: 'Sender', tooltip: 'Address' },
              { text: 'Recepient', tooltip: 'Address' },
              { text: 'Timestamp' }
            ],
            entries: transactions.map((tx: any) => {
              let totalAmountToken0;
              let totalAmountToken1;
              const totalAmountUSD = tx.swaps.reduce((acc: number, swap: any) => acc + parseFloat(swap.amountUSD), 0).toFixed(decimals);

              if (tx.swaps.length === 0) {
                totalAmountToken0 = 'None.';
                totalAmountToken1 = 'None.';
              } else if (tx.swaps.length === 1) {
                totalAmountToken0 = tx.swaps[0].token0.symbol + ' ' + parseFloat(tx.swaps[0].amount0).toFixed(decimals);
                totalAmountToken1 = tx.swaps[0].token1.symbol + ' ' + parseFloat(tx.swaps[0].amount1).toFixed(decimals);
              } else if (tx.swaps.length > 1) {
                totalAmountToken0 = 'Multiple.';
                totalAmountToken1 = 'Multiple.';
              }

              return [
                { text: `...${tx.id.slice(-4)}`, tooltip: tx.id },
                { text: totalAmountUSD },
                { text: totalAmountToken0, tooltip: tx.swaps.length === 1 ? tx.swaps[0].token0.name : undefined },
                { text: totalAmountToken1, tooltip: tx.swaps.length === 1 ? tx.swaps[0].token1.name : undefined },
                { text: tx.swaps.length === 1 ? `${tx.swaps[0].sender.slice(0, 6)}...` : 'Multiple', tooltip: tx.swaps.length === 1 ? tx.swaps[0].sender : undefined },
                { text: tx.swaps.length === 1 ? `${tx.swaps[0].recipient.slice(0, 6)}...` : 'Multiple', tooltip: tx.swaps.length === 1 ? tx.swaps[0].recipient : undefined },
                { text: timeAgo(tx.timestamp) }
              ]
            })
          }
        }
      ]
    };

    return uiDescription;
  }
};

const timeAgo = (timestamp: number) => {
  const now = new Date().getTime();
  const secondsPast = (now - timestamp * 1000) / 1000;

  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)} sec${Math.floor(secondsPast) !== 1 ? 's' : ''} ago`;
    } else if (secondsPast < 3600) {
    const minutes = Math.floor(secondsPast / 60);
    return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
    } else if (secondsPast <= 86400) {
    const hours = Math.floor(secondsPast / 3600);
    return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
    } else {
    const days = Math.floor(secondsPast / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};

export default LatestTransactionsConfig;