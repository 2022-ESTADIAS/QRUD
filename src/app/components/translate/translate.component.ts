import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
})
export class TranslateComponent implements OnInit {
  form!: FormGroup;
  currentLanguage: string = localStorage.getItem('lang') || 'es';

  constructor(private translate: TranslateService, private fb: FormBuilder) {
    const lang = localStorage.getItem('lang') || 'es';
    this.translate.use(lang);
    this.currentLanguage = lang;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      translation: [this.currentLanguage],
    });
  }

  getTranslateOptions(e: any) {
    this.translate.currentLang;
    this.translate.use(e.target.value);
    localStorage.setItem('lang', e.target.value);
    this.translate.reloadLang(e.target.value);
  }
}
