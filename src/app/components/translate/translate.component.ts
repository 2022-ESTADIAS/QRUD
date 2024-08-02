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

  currentLanguage: string = '';
  constructor(private translate: TranslateService, private fb: FormBuilder) {
    console.log(this.translate.currentLang, 'current language');
    this.currentLanguage = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      translation: [this.currentLanguage],
    });
  }

  getTranslateOptions(e: any) {
    this.translate.currentLang;
    this.translate.use(e.target.value);
  }
}
