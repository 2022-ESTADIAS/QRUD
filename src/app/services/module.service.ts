import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DynamicTranslationsService } from './dynamic-translations.service';
import { environment } from 'src/environments/environment';
import { Module, ModuleResponse } from '../interfaces/module.interface';

const { url, llaveToken } = environment;

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  constructor(
    private http: HttpClient,
    private StorageService: StorageService,
    private languageService: DynamicTranslationsService
  ) {}

  getModules() {
    const token = this.StorageService.desencriptar(llaveToken);
    return new Promise<ModuleResponse>((resolve, reject) => {
      this.http
        .get<ModuleResponse>(`${url}/module`, {
          headers: { Authorization: `Bearer ${token}` },
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
