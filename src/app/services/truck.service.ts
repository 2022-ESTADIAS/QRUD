import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DynamicTranslationsService } from './dynamic-translations.service';
import {
  SearchParams,
  TruckResponse,
} from '../interfaces/mexcal/trucks.interface';
import { environment } from 'src/environments/environment';

const { url, llaveToken } = environment;

@Injectable({
  providedIn: 'root',
})
export class TruckService {
  constructor(
    private http: HttpClient,
    private StorageService: StorageService,
    private languageService: DynamicTranslationsService
  ) {}

  getAllTrucks(opt: SearchParams) {
    const token = this.StorageService.desencriptar(llaveToken);
    const { page, keyword } = opt;
    let visitorUrl = `${url}/trucks`;
    if (page && keyword) {
      visitorUrl = `${url}/trucks?pageNumber=${page}&keyword=${keyword}`;
    } else if (keyword) {
      visitorUrl = `${url}/trucks?keyword=${keyword}`;
    } else if (page) {
      visitorUrl = `${url}/trucks?pageNumber=${page}`;
    } else {
      visitorUrl = `${url}/trucks`;
    }

    return new Promise<TruckResponse>((resolve, reject) => {
      this.http
        .get<TruckResponse>(visitorUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            lang: this.languageService.gettranslate().currentLang,
          },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
