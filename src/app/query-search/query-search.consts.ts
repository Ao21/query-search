export const FUND_NAMES = [
  'Abc First Fund',
  'ABC Equity',
  'ABC Fixed Income EU',
  'ABC Derivatives',
  'ABC Blends',
  'ABC Commodities',
  'ABC Government',
  'ABC High Yield',
  'ABC Emerging Markets',
  'ABC Domestic Equity'
];

export const FUND_TICKERS = [
  'ABCFF',
  'ABCE',
  'ABCFI',
  'ABCD',
  'ABCB',
  'ABCC',
  'ABCG',
  'ABCHY',
  'ABCEM',
  'ABCDE'
];

export const BASKET_STAGES_EU = [
  {
    percent: 12.5,
    type: 'pending',
    name: 'Transfer Agent Order Collection',
    shortName: 'TA Order Collection'
  },
  {
    percent: 25,
    type: 'pending',
    name: 'Fund Accounting Corporate Actions',
    shortName: 'FA Corporate Actions'

  },
  {
    percent: 37.5,
    type: 'ready',
    name: 'Fund Accounting Basket Transaction',
    shortName: 'FA Basket Transaction'
  },
  {
    percent: 50,
    type: 'pending',
    name: 'Fund Accounting Market Pricing + OTC Pricing',
    shortName: 'FA Market + OTC Pricing'

  },
  {
    percent: 62.5,
    type: 'pending',
    name: 'Fund Accounting NAV Calculation',
    shortName: 'FA NAV Calc'
  },
  {
    percent: 75,
    type: 'pending',
    name: 'Fund Accounting Manco Validation',
    shortName: 'FA Manco'

  },
  {
    percent: 87.5,
    type: 'pending',
    name: 'Fund Accounting Dissemination of Official NAV',
    shortName: 'FA Official NAV'
  },
  {
    percent: 100,
    type: 'pending',
    name: 'Transfer Agent Order Execution and Settlement',
    shortName: 'TA Order Execution'

  }
];

export const BASKET_STAGES = [
  {
    percent: 10,
    type: 'pending',
    name: 'Fund Accounting Morning',
    shortName: 'FA Morning'

  },
  {
    percent: 20,
    type: 'pending',
    name: 'Verifying Previous Days Basket',
    shortName: 'Verifying T-1 Basket'
  },
  {
    percent: 30,
    type: 'pending',
    name: 'Confirming Reciept of Colllateral and Evaluting',
    shortName: 'Confirming Collateral'

  },
  {
    percent: 40,
    type: 'pending',
    name: 'Transfer Agent Managing ETF Shares',
    shortName: 'TA Managing ETF Shares'
  },
  {
    percent: 50,
    type: 'pending',
    name: 'Pricing Control',
    shortName: 'Pricing Control'

  },
  {
    percent: 60,
    type: 'pending',
    name: 'Corporate Actions Control',
    shortName: 'CA Control'
  },
  {
    percent: 70,
    type: 'pending',
    name: 'Fund Accounting Afternoon',
    shortName: 'FA Afternoon'
  },
  {
    percent: 80,
    type: 'pending',
    name: 'Determining Official NAV',
    shortName: 'Official NAV'
  },
  {
    percent: 80,
    type: 'pending',
    name: 'Determining Settlement NAV',
    shortName: 'Settlement NAV',
  },
  {
    percent: 90,
    type: 'pending',
    name: 'Determining Beginning of DAY File',
    shortName: 'Begining of DAY File'
  },
  {
    percent: 95,
    type: 'ready',
    name: 'Basket is Ready',
    shortName: 'BSKT Ready'
  },
  {
    percent: 100,
    type: 'complete',
    name: 'Shipped to DTCC and all external parties',
    shortName: 'Shipping'
  }
];
