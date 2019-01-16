export const COMPROMISE_GRAMMER = {
  contains: 'Grammar',
  'does not contain': 'Grammar',
  is: 'Grammar',
  'is not': 'Grammar',
  'starts with': 'Grammar',
  'ends with': 'Grammar',
  'is greater than': 'Grammar',
  'is less than': 'Grammar',
  'is equal to': 'Grammar',
  'is not equal to': 'Grammar',
  and: 'Link',
  or: 'Link',
  not: 'Link',
  'fund group': 'Array',
  'fund category': 'Array',
  ticker: 'String',
  'fund name': 'String',
  status: ['String', 'Status'],
  type: ['String', 'Type'],
  Stage: ['String', 'Stage']

};

export const COMPROMISE_PLUGIN = {
  words: COMPROMISE_GRAMMER,
  tags: {
    Grammar: {
      isA: 'Grammar'
    },
    Array: {
      isA: 'Array'
    },
    Category: {
      isA: 'Category'
    },
    String: {
      isA: 'String'
    },
    Type: {
      isA: 'Type'
    },
    Status: {
      isA: 'Status'
    },
  }
};

export interface FilterSearchQuery {
  type: any;
  val: any;
  threshold?: number;
  union?: boolean;
}

export const COMPROMISE_QUERY_MATCH = {
  // Fund Names
  fundnameisabcfirstfund: { type: ['name'], val: 'ABC First Fund'},
  fundnameisabcequity: { type: ['name'], val: 'ABC Equity'},
  fundnameisabcfixedincomeeu: { type: ['name'], val: 'ABC Fixed Income EU'},
  fundnameisabcderivatives: { type: ['name'], val: 'ABC Derivatives'},
  fundnameisabcblends: { type: ['name'], val: 'ABC Blends'},
  fundnameisabccommodities: { type: ['name'], val: 'ABC Commodities'},
  fundnameisabcgovernment: { type: ['name'], val: 'ABC Government'},
  fundnameisabchighyield: { type: ['name'], val: 'ABC High Yield'},
  fundnameisabcemergingmarkets: { type: ['name'], val: 'ABC Emerging Markets'},
  fundnameisabcdomesticequity: { type: ['name'], val: 'ABC Domestic Equity'},
  // Tickers
  tickerisabcff: { type: ['ticker'], val: 'ABCFF' },
  tickerisabcfe: { type: ['ticker'], val: 'ABCFE' },
  tickerisabcd: { type: ['ticker'], val: 'ABCD' },
  tickerisabcc: { type: ['ticker'], val: 'ABCC' },
  tickerisabchy: { type: ['ticker'], val: 'ABCHY' },
  tickerisabcg: { type: ['ticker'], val: 'ABCG' },
  tickerisabcfi: { type: ['ticker'], val: 'ABCFI' },
  tickerisabcem: { type: ['ticker'], val: 'ABCEM' },
  tickerisabcde: { type: ['ticker'], val: 'ABCDE' },
  // Fund Name Starts
  fundnamestartswithabc: { type: ['name'], val: 'ABC' },
  // Status
  statusisontime: { type: ['status'], val: 1 },
  statusisslipping: { type: ['status'], val: 5 },
  statusislate: { type: ['status'], val: 2 },
  statusisontimeorstatusisslipping: { type: ['status'], val: [1, 5] },
  statusislateorstatusisslipping: { type: ['status'], val: [2, 5] },
  statusisontimeandstatusisslipping: { type: ['status'], val: [1, 5] },
  statusislateandstatusisslipping: { type: ['status'], val: [2, 5] },
  // Fund Type
  fundtypeisequities: {type: ['fundType'], val: 'Equities'},
  fundtypeisfixedincome: {type: ['fundType'], val: 'Fixed Income'},
  fundtypeisderivatives: {type: ['fundType'], val: 'Derivatives'},
  fundtypeiscommodity: {type: ['fundType'], val: 'Commodities'},
  fundtypeisfixedincomeandstatusisslipping: {type: ['fundType', 'status'], val: ['Fixed Income', 5], union: true},
  fundtypeisequitiesandstatusislate: {type: ['fundType', 'status'], val: ['Equities', 2], union: true},
  fundtypeisfixedincomeandstatusisontime: {type: ['fundType', 'status'], val: ['Fixed Income', 1], union: true}
};
