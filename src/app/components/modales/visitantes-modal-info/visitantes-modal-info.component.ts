import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Visitor } from 'src/app/interfaces/mexcal/visitors.interface';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';

@Component({
  selector: 'app-visitantes-modal-info',
  templateUrl: './visitantes-modal-info.component.html',
  styleUrls: ['./visitantes-modal-info.component.css'],
})
export class VisitantesModalInfoComponent implements OnInit {
  @Output() ocultar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() visitor!: any;

  constructor(private translateHelper: DynamicTranslationsService) {}

  ngOnInit(): void {}

  ocultarModal() {
    this.ocultar.emit(false);
  }

  parseDate(fecha: string) {
    return fecha.replace('t', ' ');
  }
  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }
}
