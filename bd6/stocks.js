let stocks = [
  { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 },
  { stockId: 2, ticker: 'GOOGL', companyName: 'Alphabet Inc.', price: 2750.10 },
  { stockId: 3, ticker: 'TSLA', companyName: 'Tesla, Inc.', price: 695.50 },
];

async function getStocks(ticker) {
  if (ticker === undefined) {
      if (stocks.length === 0) return null;
      return stocks;
  }
  const stock = stocks.find(stock => stock.ticker === ticker);
  return stock;
}

module.exports = {
  getStocks, stocks
};