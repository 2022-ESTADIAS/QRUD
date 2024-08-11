import { Component, OnInit } from '@angular/core';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';

@Component({
  selector: 'app-driver-regulations',
  templateUrl: './driver-regulations.component.html',
  styleUrls: ['./driver-regulations.component.css'],
})
export class DriverRegulationsComponent implements OnInit {
  constructor(public translateHelper: DynamicTranslationsService) {}

  ngOnInit(): void {}
  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }
}
