# Ngx Smart Generic Table

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pablocping/)
[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/parodCL)
[![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)]()

Generic Table to use in Angular Apps. Provides a generic structure to define table settings: data, width, translation, pagination, using the following libraries


| ngx-smart-generic-table                                                                   | @angular/cli       | Node     |
| :---------------------------------------------------------------------------------------: | :-----------------:|:-------: |
|          [1.x.x](https://www.npmjs.com/package/ngx-smart-generic-table/v/1.0.8)           | 8.3.29             | 14.17.4  |
|          [2.x.x](https://www.npmjs.com/package/ngx-smart-generic-table/v/2.0.2)           | 9.1.15             | 14.17.4  |
|          [3.x.x](https://www.npmjs.com/package/ngx-smart-generic-table/v/3.0.1)           | 10.2.4             | 14.17.4  |
|          [4.x.x](https://www.npmjs.com/package/ngx-smart-generic-table/v/4.0.3)           | 11.2.14            | 14.17.4  |
|          [5.x.x](https://www.npmjs.com/package/ngx-smart-generic-table/v/5.0.0)           | 12.2.12            | 14.17.4  |

## Installation

`$ npm install ngx-smart-generic-table --save`

### Add the dependencies according to the library version. For v4.0.3 version use the following in your package.json:


````json
    "@angular/localize": "~10.2.4",
    "@ng-bootstrap/ng-bootstrap": "^8.0.4",
    "@ng-select/ng-select": "^5.1.0",
    "@ngx-translate/core": "^13.0.0",
    "@ngx-translate/http-loader": "~6.0.0",
    "bootstrap": "^5.0.2",
````
## Usage

### Import

```typescript
  imports: [
    .....  
    TranslateModule,
    NgxSmartGenericTableModule,
    NgbModule,
    NgSelectModule,
    NgbDropdownModule,
    NgbTooltipModule
    .....  
],
  providers: [LanguageService]
```

Interfaces, Classes and Enums:
````typescript
export interface TableColumnSettings {
  align?: string;
  extra?: any;
  icon?: string;
  innerHTML?: string;
  function?: any;
  key: string;
  objectKey?: string;
  separator?: string;
  show: boolean;
  templateName: string;
  title: string;
  tooltip?: string;
  width: string;
}

export class TablePagination<T> {
  from = 0;
  list: Array<T> = [];
  pages = 0;
  to = 0;
  total = 0;
}
````
Example Usage
```typescript
export class Product {
  id: number;
  name: string;
  code: string;
  price: number;
  status: boolean;
}
```
Create a enum with entity Keys
```typescript
export enum ProductsTableColumnKey {
  Id = "id",
  Name = "name",
  Code = "code",
  Price = "price",
  Status = "status"
}
```
Choose a template available according to your class/interface attribute type
```typescript
export enum TemplateNames {
  ActionsTemplate = 'actionsTemplate',
  CurrencyTemplate = 'currencyTemplate',
  DateTemplate = 'dateTemplate', //dd/MM/yyyy
  FullDateTemplate = 'fullDateTemplate', //dd/MM/yyyy HH:mm:ss
  NumberTemplate = 'numberTemplate',
  ObjectTemplate = 'objectTemplate', //If the object has nested objects you must indicate the Object key to access to object value
  StatusTemplate = 'statusTemplate', //If the object has a value to check if true or false
  TextTemplate = 'textTemplate',
  TimeTemplate = 'timeTemplate', //'HH:mm'
  FunctionTemplate = 'functionTemplate' //call the function defined from child to parent component
}
```
Choose a button type if your template chosen is 'ActionsTemplate'
```typescript
export enum ButtonType {
  Href = 'href',
  Modal = 'modal',
  Swal = 'swal'
}
```

Product Table Settings Example:
```typescript


export const PRODUCTTABLESETTINGS: TableColumnSettings[] = [
  {
    key: ProductsTableColumnKey.Code,
    title: 'MODEL.PRODUCT.CODE',
    templateName: TemplateNames.TextTemplate,
    width: 'w-15',
    show: true
  },
  {
    key: ProductsTableColumnKey.innerHTML,
    title: 'MODEL.PRODUCT.BARCODE',
    templateName: TemplateNames.FunctionTemplate,
    width: 'w-15',
    icon: 'font-size-15 fas fa-barcode text-success align-middle',
    separator: '-',
    function: 'setNombre',
    tooltip: 'MODEL.PRODUCT.BARCODE',
    align: AlignType.Center,
    show: true
  },
  {
    key: ProductsTableColumnKey.Name,
    title: 'MODEL.PRODUCT.NAME',
    templateName: TemplateNames.TextTemplate,
    width: 'w-25',
    show: true
  },
  {
    key: ProductsTableColumnKey.Price,
    title: 'MODEL.PRODUCT.PRICE',
    templateName: TemplateNames.CurrencyTemplate,
    width: 'w-15',
    show: true,
    align: AlignType.Right
  },
  {
    key: ProductsTableColumnKey.Status,
    title: 'SHARED.TABLE.STATUS',
    templateName: TemplateNames.StatusTemplate,
    width: 'w-15',
    show: true,
    align: AlignType.Center
  },
  {
    key: ProductsTableColumnKey.Id,
    title: 'SHARED.TABLE.ACTIONS',
    templateName: TemplateNames.ActionsTemplate,
    width: 'w-15',
    show: true,
    align: AlignType.Center,
    extra: [
      {
        type: ButtonType.Modal,
        tooltip: 'MODEL.PRODUCT.DETAIL',
        class: 'btn btn-sm btn-info btn-size-30',
        icon: 'far fa-window-restore'
      },
      {
        type: ButtonType.Swal,
        key: ProductsTableColumnKey.Status,
        enable: {
          tooltip: 'MODEL.PRODUCT.DISABLE',
          class: 'btn btn-sm btn-success btn-size-30',
          icon: 'fas fa-lock-open'
        },
        disable: {
          tooltip: 'MODEL.PRODUCT.ENABLE',
          class: 'btn btn-sm btn-danger btn-size-30',
          icon: 'fas fa-lock'
        },
      }
    ]
  }
];
````

The library and repository includes a languageService looking for the language set on localstorage, you can set your language.json inside assets folder and fill your dictionary, in this case shared and table are basics, you can add all the tables you need here.
````
    ├── src
    │   ├── assets
    │   │    ├── i18n
    │   │    │     ├── es.json
    │   │    │     ├── en.json
````

````json
{
  "SHARED":{
    "ENABLED": "Enabled",
    "DISABLED": "Disabled"
  },
  "TABLE": {
    "SHOW": "Show",
    "ENTRIES": "entries",
    "SEARCH": "Search",
    "SHOWING": "Showing",
    "TO": "a",
    "OF": "of",
    "GO": "Go page",
    "HREF": "Go to",
    "ACTIONS": "Actions",
    "STATUS": "Status",
    "FILTERS": "Filters",
    "NORECORDS": "No records registered to show",
    "NOAPPLY": "No Apply"
  },
  "MODEL": {
    "PRODUCT": {
      "ID": "Id",
      "NAME": "Name",
      "CODE": "Supplier Code",
      "BARCODE": "Barcode",
      "PRICE": "Price",
      "DETAIL": "Product Detail",
      "ENABLE": "Enable Product",
      "DISABLE": "Disable Product"
    }
  }
}

````
## Important Options

| Options                  | Type                     | Default                           | Description                                                                                                       |
| ------------------------ | ------------------------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| tableSettings            | `TableColumnSettings[]`  | undefined                         | Includes attribute's key, title, templateName, width and show options                                             |
| tablePagination          | `TablePagination<any>`   | undefined                         | Store the data and pagination info: from, to, pages, total                                                        |
| pageSize                 | `number`                 | 10                                | Size of elements shown in the table                                                                               |
| hasPagination            | `boolean`                | true                              | Conditional to show pagination or not                                                                             |
| hasPageSize              | `boolean`                | true                              | Conditional to show page size select                                                                              |
| hasPageSearch            | `boolean`                | true                              | Conditional to show page search input                                                                             |
| currency                 | `string `                | CLP                               | Currency preferred if you chose CurrencyTemplate                                                                  | 
| symbol                   | `string `                | symbol-narrow                     | Currency symbol                                                                                                   |
| digits                   | `string `                | .0-0                              | Currency digits                                                                                                   |
| setPageEmitter           | `EventEmitter<number>`   | 1                                 | Returns the page selected from pagination to parent component                                                     |
| setPageSizeEmitter       | `EventEmitter<number>`   | 10                                | Returns the page size selected to parent component                                                                |
| buttonClickedEmmiter     | `EventEmitter<any>`      |                                   | Returns a json including the selected row and Button Type. Example: {data: {id: 1, name: 'Product'}, type: 'swal'}|
| functionEmitter          | `EventEmitter<any>`      |                                   | Returns a json including the selected row and Button Type. Example: {data: {index: 1, columnSetting: ColumnSetting}}|


## Example

Refer to main app in this repository for working example.

````angular2html
<ngx-smart-generic-table [tableSettings]="settings"
                         [tablePagination]="tablePagination"
                         [pageSize]="pageSize"
                         (setPageEmitter)="setPage($event)"
                         (setPageSizeEmitter)="setPageSize($event)"
                         [hasPagination]="true"
                         (functionEmitter)="setFunction($event)"
                         (buttonClickEmitter)="onButtonClickedEmitter($event)"></ngx-smart-generic-table>
````
## Library Contributions

- Fork repo.
- Update `./projects/smart-generic-table`
- Build / test library.
- Update `./src/app` with new functionality.
- Update README.md
- Pull request.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
   <td align="center"><a href="https://gitlab.com/pabloCL"><img src="https://lh3.googleusercontent.com/fife/AAWUweWUtur8L_fbWj3XUrzXmuIMvw77JURepPc3OdzWn6y1-1E4qgipmffdclXd9kyKS8sa8HvRbTiGKRaV7_-m_AwXelubqXPvlLNL7G9ybPiZGLr1BxlwjBxZOGvmiGW-UN_92vql8Ydu75cLIsvwfMYuIeT4k7hZ2NnnRyDnkHdJ2FIyc-3FtwsKWaEicKYGzvfN9NA6w67iPdEtFk6-vH4ePt-gP6HbKbstf-152PFlMq6Na9vIMVhVs6LEiMVrGY4VGVCFdmQLem0VjNJJ944XN_lPgtkh9b9J0SxU74begX2zjV9aUk8XHQAYFirY_c59OWQIZtK64n2fbePutYu4bzB_ewzv8xO636X073hPVEbQ4nHUZ_bLgmKVq7-5xtC-cSnyX3CNj6FHcc3f282ZHf5L9-T8zNgn-7DBc1C7MjPLwouMfQnTLmJ6dGNuHdRLXf-JBU16v4J8a8VQkb22txeFGF6QYJYmpQUnSgrU8Am_HAI4YS5-r2opOA0xkqIt6W0O8wdj5n138PdjM02Dgsu3yWeZayDKa5cjM-cbxBIewx-7e4vNPuD2uxIm39-5IoulS0kS9htdrupy-n3UO_LGrqDmLzBM5y71vL75b1px_x-VprXdcl-33gmYj7_rOz4D-sv8CjxvthqkeQbI_MtDlFwdLGhCX4BXieBy0xSO8icbxJFgSRGoFckd0S0AQErgtDTKwY06JGwyw3fZ_sHf6vPDQqZyCiJ8Pv7FLA=s83-c" width="100px;" alt=""/><br /><sub><b>Pablo Contreras</b></sub></a><br /><a href="https://gitlab.com/pabloCL" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome!
