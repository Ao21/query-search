import { Component } from '@angular/core';
import { ScannerService } from './lexer/scanner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'query-search';

  constructor(private scanner: ScannerService) {

    this.scanner.setText('fundsgroup IN "Hello"');

    this.scanner.getTokens();
  }
}
