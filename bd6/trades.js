let trades = [
  { tradeId: 1, stockId: 1, quantity: 10, tradeType: 'buy', tradeDate: '2024-08-07' },
  { tradeId: 2, stockId: 2, quantity: 5, tradeType: 'sell', tradeDate: '2024-08-06' },
  { tradeId: 3, stockId: 3, quantity: 7, tradeType: 'buy', tradeDate: '2024-08-05' },
];

async function getTrades(id) {
  if (id === undefined) {
      if (trades.length === 0) return null;
      return trades;
  }
  const trade = trades.find(trade => trade.tradeId === id);
  return trade;
}

async function addTrade(trade) {
  let newTrade = { tradeId: trades.length + 1, ...trade };
  trades.push(newTrade);
  return newTrade;
}

module.exports = {
  getTrades,
  addTrade
};