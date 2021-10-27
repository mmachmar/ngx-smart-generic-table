import {NgModule} from '@angular/core';
import {NgxSmartGenericTableComponent} from './ngx-smart-generic-table.component';
import {
  NgbDropdownModule,
  NgbModule,
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {OnlyNumberDirective} from './only-number.directive';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    NgxSmartGenericTableComponent,
    OnlyNumberDirective],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgbTooltipModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [NgxSmartGenericTableComponent]
})
export class NgxSmartGenericTableModule {
}
