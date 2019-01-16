import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { QuerySearchSelectedEvent } from './query-search.component';
import {
  COMPROMISE_GRAMMER,
  COMPROMISE_PLUGIN,
  COMPROMISE_QUERY_MATCH
} from './compromise-settings';
import { ConstantPool } from '@angular/compiler';

import { includes } from 'lodash';

import * as nlp from 'compromise';
import { FUND_NAMES, FUND_TICKERS, BASKET_STAGES, BASKET_STAGES_EU } from './query-search.consts';
nlp.plugin(COMPROMISE_PLUGIN);

const GRAMMAR_LINKS = [];

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

  options: BehaviorSubject<any> = new BehaviorSubject(GRAMMAR_TREE.categories);

  filters: any[] = [];

  tags: any;

  constructor() {
    const BASKET_STATUSES = [...BASKET_STAGES, ...BASKET_STAGES_EU].map(
      x => x.name
    );

    const ETF_TYPES = ['Equities', 'Fixed Income', 'Commodity', 'Derivatives'];

    this.tree = {
      ...GRAMMAR_TREE,
      stages: BASKET_STATUSES,
      fundNames: FUND_NAMES,
      tickers: FUND_TICKERS,
      types: ETF_TYPES
    };

    this.control.valueChanges.subscribe((n: string) => {
      const v = nlp(n);

      this.tags = v.out('tags');

      if (!this.tags.length) {
        this.reset.next();
        return this.options.next(GRAMMAR_TREE.categories);
      }

      this.checkEntries(this.tags);

      const lastTermTags = this.tags[this.tags.length - 1].tags;
      let secondLastTags = [];
      let secondLastItem: any = {};

      if (this.tags.length > 1) {
        secondLastTags = this.tags[this.tags.length - 2].tags;
        secondLastItem = this.tags[this.tags.length - 2];
      }

      if (secondLastItem.normal === 'status') {
        return this.options.next(this.tree.status);
      }

      if (secondLastItem.normal === 'type') {
        return this.options.next(this.tree.types);
      }

      if (secondLastItem.normal === 'ticker') {
        return this.options.next(this.tree.tickers);
      }

      if (secondLastItem.normal === 'stage') {
        return this.options.next(this.tree.stages);
      }

      if (secondLastItem.normal === 'name') {
        return this.options.next(this.tree.fundNames);
      }

      if (lastTermTags.find(x => x === 'Array')) {
        return this.options.next(GRAMMAR_TREE.array);
      }

      if (lastTermTags.find(x => x === 'Link')) {
        return this.options.next(GRAMMAR_TREE.categories);
      }

      if (lastTermTags.find(x => x === 'String')) {
        return this.options.next(GRAMMAR_TREE.string);
      }

      const lastWordIsNotTag =
        !lastTermTags.find(x => x === 'String') &&
        !lastTermTags.find(x => x === 'Link') &&
        !lastTermTags.find(x => x === 'Array') &&
        !lastTermTags.find(x => x === 'Grammar');

      const secondLastWordIsTag = [
        secondLastTags.includes('String'),
        secondLastTags.includes('Link'),
        secondLastTags.includes('Array'),
        secondLastTags.includes('Grammar')
      ];

      if (
        lastWordIsNotTag &&
        secondLastWordIsTag.includes(true) &&
        n.charAt(n.length - 1) === ' '
      ) {
        return this.options.next(GRAMMAR_TREE.links);
      }

      this.options.next([]);
    });
  }

  checkEntries(tags: any[]) {
    const item = tags.reduce((accum, x) => {
      return accum + x.normal;
    }, '');

    console.log(item);

    this.isValidQuery =
      COMPROMISE_QUERY_MATCH[item] !== undefined ? true : false;

    if (this.isValidQuery) {
      this.match.next(COMPROMISE_QUERY_MATCH[item]);
    } else {
      this.reset.next();
    }
  }

  displayFn(val): string | undefined {
    return val ? val : undefined;
  }

  selectOption(event: QuerySearchSelectedEvent) {
    // const val = event.option.value;
    // this.filters.push(val);
    // let next = this.tree[val.next];
    // if (val.override) {
    //   next = next.map(x => ({ ...x, next: val.override }));
    // }
    // this.isManualEntry = !next ? true : false;
    // this.options.next(next);
  }
}
