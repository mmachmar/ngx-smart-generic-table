import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbDropdownModule, NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService} from './language.service';
import {NgxSmartGenericTableModule} from '../../projects/ngx-smart-generic-table/src/lib/ngx-smart-generic-table.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule,
    NgxSmartGenericTableModule,
    NgbModule,
    NgSelectModule,
    NgbDropdownModule,
    NgbTooltipModule
  ],
  providers: [LanguageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
