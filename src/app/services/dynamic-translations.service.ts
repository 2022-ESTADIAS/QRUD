import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicTranslationsService {
  constructor(private translate: TranslateService) {}

  getUserTypes(type: string) {
    if (this.translate.currentLang == 'en') {
      switch (type) {
        case 'Transportistas':
          return 'Drivers';
        case 'Proveedores':
          return 'Providers';
        case 'Visitantes':
          return 'Visits';
      }
    }

    return type;
  }

  instantTranslation(key: string, params?: any) {
    if (params) {
      const translate = this.translate.instant(key, {
        ...params,
      });
      return translate;
    } else {
      return this.translate.instant(key);
    }
  }
}
