import { SyntaxKind } from '../lexer/scanner.interfaces';

export const QueryFieldSyntaxKind = {};
export enum QueryFieldType {
  Fund = 'Fund',
  FundGroup = 'FundGroup'
}
export type QueryOperators =
  | SyntaxKind.EqualsToken
  | SyntaxKind.ExclamationEqualsToken
  | SyntaxKind.InKeywordToken;

export interface QueryField {
  name: string;
  type: SyntaxKind;
  operators: string[];
  options?: string[];
}

export const DEFAULT_FIELDS: QueryField[] = [
  {
    name: 'Fund',
    type: SyntaxKind.QueryToken,
    operators: ['=', '!=']
  },
  {
    name: 'FundGroup',
    type: SyntaxKind.QueryToken,
    operators: ['=', '!=']
  },
  {
    name: 'DocumentType',
    type: SyntaxKind.QueryToken,
    operators: ['=', '!='],
    options: ['AFS', 'K1 Tax Documents']
  }
];
