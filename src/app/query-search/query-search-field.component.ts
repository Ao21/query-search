import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { QuerySearchSelectedEvent } from './query-search.component';
import { DEFAULT_FIELDS } from './query-search.consts';
import { ScannerService } from '../lexer/scanner.service';
import { SyntaxKind, QueryToken } from '../lexer/scanner.interfaces';
import { Token } from '@angular/compiler';

const GRAMMAR_TREE = {
  array: ['contains', 'does not contain'],
  string: ['is', 'is not', 'starts with', 'ends with'],
  number: ['is greater than', 'is less than', 'is equal to', 'is not equal to'],
  links: ['and', 'or', 'not'],
  status: ['On Time', 'Slipping', 'Late'],
  categories: ['Fund Name', 'Fund Type', 'Stage', 'Status', 'Ticker']
};

@Component({
  selector: 'etf-query-search-field',
  templateUrl: './query-search-field.component.html',
  styleUrls: ['./query-search-field.component.scss']
})
export class QuerySearchFieldComponent {
  control: FormControl = new FormControl();

  isValidQuery = false;
  tree: any;
  isManualEntry = false;
  @Output() match: EventEmitter<string> = new EventEmitter();
  @Output() reset: EventEmitter<string> = new EventEmitter();

  options: BehaviorSubject<any> = new BehaviorSubject([]);

  fields = DEFAULT_FIELDS.map(x => x.name);

  filters: any[] = [];
  tags: any;

  constructor(private scanner: ScannerService) {
    this.options.next(this.fields);
    this.scanner.addTokens(DEFAULT_FIELDS);
    this.control.valueChanges.subscribe((n: string) => {
      this.scanner.setText(n);
      const tokens = this.scanner.getTokens();

      console.log(tokens);
      const lastToken = tokens[tokens.length - 1];

      if (!lastToken) {
        return this.options.next(this.fields);
      }

      this.isValidQuery = this.checkEntries(tokens);

      if (lastToken && !n.endsWith(' ')) {
        return this.options.next([]);
      }

      if (this.isLastLinkToken(lastToken)) {
        return this.options.next(this.fields);
      }

      if (this.isLastIdentifierToken(lastToken)) {
        return this.options.next(GRAMMAR_TREE.links);
      }

      if (this.isLastQueryToken(lastToken)) {
        const operators = this.getQueryTokenOperators(lastToken);
        return this.options.next(operators);
      }

      if (this.isLastOperatorToken(lastToken)) {
        console.log(tokens[tokens.length - 1]);

        return this.options.next([]);
      }
    });
  }

  isLastLinkToken(token: QueryToken) {
    return token.currentToken === SyntaxKind.LinkToken;
  }
  isLastQueryToken(token: QueryToken) {
    return token.currentToken === SyntaxKind.QueryToken;
  }

  isLastOperatorToken(token: QueryToken) {
    return token.currentToken === SyntaxKind.OperatorToken;
  }

  isLastIdentifierToken(token: QueryToken) {
    return (
      token.currentToken === SyntaxKind.Identifier ||
      token.currentToken === SyntaxKind.StringLiteral
    );
  }

  getQueryTokenOperators(token: QueryToken) {
    const field = DEFAULT_FIELDS.find(
      x => x.name.toLowerCase() === token.tokenVal.toLowerCase()
    );
    return field.operators;
  }

  checkEntries(tokens: QueryToken[]) {
    let isValid = true;

    if (!tokens.length) {
      return false;
    }

    // Last Token should be an Identifier
    if (tokens[tokens.length - 1].currentToken !== SyntaxKind.Identifier) {
      isValid = false;
    }

    tokens.reverse().forEach((token: QueryToken, i: number) => {
      const nextToken = tokens[i + 1];
      const isLastToken = !nextToken;

      if (isLastToken) {
        return;
      }

      switch (token.currentToken) {
        case SyntaxKind.Identifier:
          if (nextToken.currentToken !== SyntaxKind.OperatorToken) {
            isValid = false;
          }
          return;
        case SyntaxKind.OperatorToken:
          if (nextToken.currentToken !== SyntaxKind.QueryToken) {
            isValid = false;
          }
          return;
        case SyntaxKind.QueryToken:
          if (nextToken && nextToken.currentToken !== SyntaxKind.LinkToken) {
            isValid = false;
          }
          return;
      }
    });

    return isValid;
  }

  displayFn(val): string | undefined {
    return val ? val : undefined;
  }

  selectOption() {}
}
