import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class LanguageService {
  public languages: string[] = ['en', 'es', 'de', 'it', 'ru'];

  constructor(public translate: TranslateService) {
    let browserLang;
    this.translate.addLangs(this.languages);
    browserLang = localStorage.getItem('lang');
    if (!!browserLang) {
      translate.use(browserLang);
    } else {
      browserLang = translate.getBrowserLang();
      browserLang = !!browserLang.split('-')[0] ? browserLang.split('-')[0] : browserLang;
      this.setLanguage(browserLang);
    }
  }

  public setLanguage(lang): void {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
