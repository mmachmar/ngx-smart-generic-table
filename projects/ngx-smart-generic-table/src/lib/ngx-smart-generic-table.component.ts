import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TablePagination} from './model/table-pagination';
import {TableColumnSettings} from './model/table-column-settings';

@Component({
  selector: 'ngx-smart-generic-table',
  template: `
    <div class="row mb-2">
      <div class="col-md-12 col-sm-12">
        <div class="align-middle">
          <label *ngIf="hasPageSize"
                 class="d-inline-flex align-items-center align-middle mt-1">
            <span>{{'SHARED.TABLE.SHOW' | translate}}</span>
            <select (ngModelChange)="setPageSize($event)" [(ngModel)]="pageSize"
                    class="form-control form-control-sm mx-2 font-size-14 text-align-last"
                    name="pageSize">
              <option [ngValue]="10">10</option>
              <option [ngValue]="25">25</option>
              <option [ngValue]="50">50</option>
              <option [ngValue]="100">100</option>
            </select> <span class="">{{'SHARED.TABLE.ENTRIES' | translate}}</span></label>
          <label *ngIf="hasPageSearch"
                 class="d-inline-flex align-items-center float-end me-3 mt-1"><span
            class="">{{'SHARED.TABLE.GO' | translate}}: </span>
            <div class="input-group w-auto">
              <input [(ngModel)]="pageSearch" [min]="min" [OnlyNumber]="true"
                     class="form-control form-control-sm ms-2 text-center wp-40" type="text">
              <button class="btn btn-success py-0 wp-40 hp-31" type="button"
                      (click)="goTo(pageSearch)">
                <i class="fas fa-arrow-right align-middle font-size-14"></i>
              </button>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="table-overflow">
      <table class="table table-bordered">
        <thead>
        <tr class="text-center">
          <th *ngFor="let column of tableSettings" [class]="column.width">
            {{column.title | translate}}
          </th>
        </tr>
        </thead>
        <tbody *ngIf="tablePagination.total > 0">
        <tr class="align-middle text-uppercase" *ngFor="let data of tablePagination.list; let i = index">
          <td *ngFor="let column of tableSettings" [align]="column.align">
            <div *ngIf="column.templateName == 'numberTemplate'" [ngbTooltip]="column?.tooltip ? (column.tooltip | translate) : ''">
              <i *ngIf="column?.icon" [class]="column.icon"></i>
              {{!!data[column.key] ? (data[column.key] | number) : ('SHARED.TABLE.NOAPPLY' | translate)}}
            </div>
            <div *ngIf="column.templateName == 'functionTemplate'" [innerHTML]="!!data[column.key] ? data[column.key] : ''">
              {{setFunction(i, column)}}
            </div>
            <div *ngIf="column.templateName == 'textTemplate'" [ngbTooltip]="column?.tooltip ? (column.tooltip | translate) : ''">
              <i *ngIf="column?.icon" [class]="column.icon"></i> {{column.separator}} {{!!data[column.key] ? (data[column.key]) : ('SHARED.TABLE.NOAPPLY' | translate)}}
            </div>
            <div *ngIf="column.templateName == 'objectTemplate'" [ngbTooltip]="column?.tooltip ? (column.tooltip | translate) : ''">
              <i *ngIf="column?.icon" [class]="column.icon"></i>
              {{data[column.key] && !!column.objectKey ? (data[column.key][column.objectKey] | uppercase)
              : (!!data[column.key] ? (data[column.key]) : ('SHARED.TABLE.NOAPPLY' | translate))}}
            </div>
            <div *ngIf="column.templateName == 'dateTemplate'" [ngbTooltip]="column?.tooltip ? (column.tooltip | translate) : ''">
              <i *ngIf="column?.icon"
                 [class]="column.icon"></i>{{!!data[column.key] ? (data[column.key] | date: 'dd/MM/yyyy') : ('SHARED.TABLE.NOAPPLY' | translate)}}
            </div>
            <div *ngIf="column.templateName == 'fullDateTemplate'" [ngbTooltip]="column?.tooltip ? (column.tooltip | translate) : ''">
              <i *ngIf="column?.icon" [class]="column.icon"></i>
              {{!!data[column.key] ? (data[column.key] | date: 'dd/MM/yyyy HH:mm:ss') : ('SHARED.TABLE.NOAPPLY' | translate)}}
            </div>
            <div *ngIf="column.templateName == 'timeTemplate'" [ngbTooltip]="column?.tooltip ? (column.tooltip | translate) : ''">
              <i *ngIf="column?.icon" [class]="column.icon"></i>{{data[column.key] | date: 'HH:mm'}}
            </div>
            <div *ngIf="column.templateName == 'statusTemplate'" class="font-size-16"
                 [ngbTooltip]="column?.tooltip ? (column.tooltip | translate) : ''">
              <span
                [class]="data[column.key] ? 'badge badge-soft-success p-2' : 'badge badge-soft-danger p-2'">
                   <i *ngIf="column?.icon"
                      [class]="column.icon"></i> {{data[column.key] ? ('SHARED.ENABLED' | translate) : ('SHARED.DISABLED' | translate)}}
              </span>
            </div>
            <div *ngIf="column.templateName == 'currencyTemplate'" [ngbTooltip]="column?.tooltip ? (column.tooltip | translate) : ''">
              <i *ngIf="column?.icon" [class]="column.icon"></i>
              {{!!data[column.key] ? (data[column.key] | currency: currency: symbol : digits) : ('SHARED.TABLE.NOAPPLY' | translate) }}
            </div>
            <div *ngIf="column.templateName == 'actionsTemplate'">
              <button *ngFor="let b of column.extra" [class]="setClass(b, data[b.key])"
                      (click)="clickButton(data, b.type)" [ngbTooltip]="setTooltip(b, data[b?.key]) | translate">
                <i [class]="setIcon(b, data[b.key])"></i>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
        <tbody *ngIf="tablePagination.total == 0">
        <tr>
          <td [colSpan]="tableSettings.length" class="text-center">
            {{'SHARED.TABLE.NORECORDS' | translate}}
          </td>
        </tr>
        </tbody>
      </table>
      <div class="row" *ngIf="hasPagination && tablePagination.total > 0">
        <div class="col-md-6 hide-element">
         <span>
                       {{'SHARED.TABLE.SHOWING' | translate}}
           <span class="font-weight-semibold">{{tablePagination.from}}</span>
           {{'SHARED.TABLE.TO' | translate}}
           <span class="font-weight-semibold">{{tablePagination.to}}</span>
           {{'SHARED.TABLE.OF' | translate}}
           <span class="font-weight-semibold">{{tablePagination.total}}</span>
           {{'SHARED.TABLE.ENTRIES' | translate}}
                  </span>
        </div>
        <!-- Pagination -->
        <div class="col-md-6 col-pagination">
          <div class="pagination-rounded">
            <ngb-pagination (pageChange)="setPage($event)" [(page)]="page" class="paginator"
                            [boundaryLinks]="true" [collectionSize]="tablePagination.total" [maxSize]="5"
                            [pageSize]="pageSize"
                            [rotate]="true">
            </ngb-pagination>
          </div>
        </div>
        <!-- End Pagination -->
      </div>
    </div>
  `,
  styleUrls: ['./ngx-smart-generic-table.component.scss']
})
export class NgxSmartGenericTableComponent implements OnInit {

  @Input() tableSettings: TableColumnSettings[] = [];
  @Input() tablePagination: TablePagination<any> = new TablePagination<any>();
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() pageSearch = 1;
  @Input() hasPageSize = true;
  @Input() hasPageSearch = true;
  @Input() hasPagination = true;
  @Input() min = 1;
  @Input() currency = 'CLP';
  @Input() symbol = 'symbol-narrow';
  @Input() digits = '.0-0';
  @Output() setPageEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() setPageSizeEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() buttonClickEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() functionEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() loading = true;

  ngOnInit(): void {
  }

  setPage(page: number): void {
    this.setPageEmitter.emit(page);
  }

  setPageSize(pageSize: any): void {
    this.setPageSizeEmitter.emit(pageSize);
  }

  goTo(pageSearch: number): void {
    this.page = pageSearch;
  }

  clickButton(data: any, type: any): void {
    const array = {
      data, type
    };
    this.buttonClickEmitter.emit(array);
  }

  setClass(b: any, status?: boolean): any {
    switch (b.type) {
      case 'swal':
        if (status) {
          return b.enable.class;
        } else {
          return b.disable.class;
        }
      default:
        return b.class;
    }
  }

  setTooltip(b: any, status?: boolean): any {
    switch (b.type) {
      case 'swal':
        if (status) {
          return b.enable.tooltip;
        } else {
          return b.disable.tooltip;
        }
      default:
        return b.tooltip;
    }
  }

  setIcon(b: any, status?: boolean): any {
    switch (b.type) {
      case 'swal':
        if (status) {
          return b.enable.icon;
        } else {
          return b.disable.icon;
        }
      default:
        return b.icon;
    }
  }

  setFunction(index: any, columnSetting: TableColumnSettings): any {
    const array = {
      index, columnSetting
    };
    this.functionEmitter.emit(array);
  }

}
