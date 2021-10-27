import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {Product, PRODUCTTABLESETTINGS} from './model/product';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from './language.service';
import {TablePagination} from 'projects/ngx-smart-generic-table/src/lib/model/table-pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  title = 'SmartGenericTableLibrary';
  settings = PRODUCTTABLESETTINGS;
  tablePagination: TablePagination<Product> = new TablePagination<Product>();
  pageSize = 10;
  listLang = [
    {text: 'Español', lang: 'es'},
    {text: 'English', lang: 'en'},
    // { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    // { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    // { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];
  cookieValue: string;
  element;
  configData;
  flagvalue;
  countryName;
  valueset;
  lang = 'es';

  setPage($event: number): void {
    this.filter($event);
  }

  setPageSize($event: any): void {
    this.pageSize = $event;
    this.filter(1);
  }

  filter(page: any): void {
  }

  reset(): void {
    this.filter(1);
  }

  onButtonClickedEmitter(json: any): void {
    switch (json.type) {
      case 'modal':
        alert(json.type);
        break;
      case 'swal':
        alert(json.type);
        break;
      case 'href':
        alert(json.type);
        break;
    }
  }


  constructor(private languageService: LanguageService, private translateService: TranslateService, private cdRef: ChangeDetectorRef) {
    this.tablePagination.list = [
      {
        id: 3,
        barcode: '87986',
        code: 'oklklk',
        compoundName: 'oklklk-lkjlkj',
        name: 'lkjlkj',
        price: 675765.00,
        status: false
      },
      {
        id: 3,
        barcode: '87986',
        code: 'oklklk',
        compoundName: 'oklklk-lkjlkj',
        name: 'lkjlkj',
        price: 675765.00,
        status: false
      },
      {
        id: 3,
        barcode: '87986',
        code: 'oklklk',
        compoundName: 'oklklk-lkjlkj',
        name: 'lkjlkj',
        price: 675765.00,
        status: false
      },
      {
        id: 3,
        barcode: '87986',
        code: 'oklklk',
        compoundName: 'oklklk-lkjlkj',
        name: 'lkjlkj',
        price: 675765.00,
        status: false
      },
      {
        id: 3,
        barcode: '87986',
        code: 'oklklk',
        compoundName: 'oklklk-lkjlkj',
        name: 'lkjlkj',
        price: 675765.00,
        status: false
      },
      {
        id: 3,
        barcode: '87986',
        code: 'oklklk',
        compoundName: 'oklklk-lkjlkj',
        name: 'lkjlkj',
        price: 675765.00,
        status: false
      },
      {
        id: 3,
        barcode: '87986',
        code: 'oklklk',
        compoundName: 'oklklk-lkjlkj',
        name: 'lkjlkj',
        price: 675765.00,
        status: false
      },
      {
        id: 3,
        barcode: '87986',
        code: 'oklklk',
        compoundName: 'oklklk-lkjlkj',
        name: 'lkjlkj',
        price: 675765.00,
        status: false
      },
      {
        id: 3,
        barcode: '87986',
        code: 'oklklk',
        compoundName: 'oklklk-lkjlkj',
        name: 'lkjlkj',
        price: 675765.00,
        status: false
      },
      {
        id: 3,
        barcode: '87986',
        code: null,
        compoundName: 'oklklk-lkjlkj',
        name: 'lkjlkj',
        price: 675765.00,
        status: false
      },
    ];
    this.tablePagination.from = 1;
    this.tablePagination.to = 1;
    this.tablePagination.pages = 1;
    this.tablePagination.total = 1;
  }

  setLanguage(text: string, lang: string): void {
    this.countryName = text;
    this.cookieValue = lang;
    this.lang = lang;
    this.translateService.use(lang);
  }

  setFunction($event: any): void {
    switch ($event.columnSetting.function) {
      case 'setNombre':
        const producto: Product = this.tablePagination.list[$event.index];
        // tslint:disable-next-line:max-line-length
        this.tablePagination.list[$event.index].innerHTML = `<div title="${this.translateService.instant($event.columnSetting.tooltip)}"><i class="${$event.columnSetting.icon}"></i> <span class="align-middle">${producto.barcode}</span></div>`;
        break;
      default:
        break;
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
