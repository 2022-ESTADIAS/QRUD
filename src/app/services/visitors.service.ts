import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import {
  DriverSearchParams,
  DriversResponse,
  TruckDriverResponse,
  TruckDriverSearchParams,
  TrucksAssignedResponse,
  VisitorSearchParams,
  VisitorsResponse,
} from '../interfaces/mexcal/visitors.interface';
import { DynamicTranslationsService } from './dynamic-translations.service';

const { url, llaveToken } = environment;

@Injectable({
  providedIn: 'root',
})
export class VisitorsService {
  constructor(
    private http: HttpClient,
    private StorageService: StorageService,
    private languageService: DynamicTranslationsService
  ) {}

  getAllVisitors(opt: VisitorSearchParams) {
    const token = this.StorageService.desencriptar(llaveToken);
    const { page, keyword } = opt;
    let visitorUrl = `${url}/visitors`;
    if (page && keyword) {
      visitorUrl = `${url}/visitors?pageNumber=${page}&keyword=${keyword}`;
    } else if (keyword) {
      visitorUrl = `${url}/visitors?keyword=${keyword}`;
    } else if (page) {
      visitorUrl = `${url}/visitors?pageNumber=${page}`;
    } else {
      visitorUrl = `${url}/visitors`;
    }

    return new Promise<VisitorsResponse>((resolve, reject) => {
      this.http
        .get<VisitorsResponse>(visitorUrl, {
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
  AssignationTrucks(id: string, data: string[]) {
    const token = this.StorageService.desencriptar(llaveToken);
    return new Promise<{ msg: string }>((resolve, reject) => {
      this.http
        .post<{ msg: string }>(
          `${url}/personal/truck-assignation/${id}`,
          {
            drivers: data,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              lang: this.languageService.gettranslate().currentLang,
            },
          }
        )
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
  trucksAlreadyAssigned(id: string) {
    const token = this.StorageService.desencriptar(llaveToken);
    return new Promise<TrucksAssignedResponse>((resolve, reject) => {
      this.http
        .get<TrucksAssignedResponse>(
          `${url}/visitors/assigned-trucks/${id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              lang: this.languageService.gettranslate().currentLang,
            },
          }
        )
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
  getAllDrivers(opt: DriverSearchParams) {
    const token = this.StorageService.desencriptar(llaveToken);
    const { page, keyword } = opt;
    let visitorUrl = `${url}/visitors/drivers`;
    if (page && keyword) {
      visitorUrl = `${url}/visitors/drivers?pageNumber=${page}&keyword=${keyword}`;
    } else if (keyword) {
      visitorUrl = `${url}/visitors/drivers?keyword=${keyword}`;
    } else if (page) {
      visitorUrl = `${url}/visitors/drivers?pageNumber=${page}`;
    } else {
      visitorUrl = `${url}/visitors/drivers`;
    }

    return new Promise<DriversResponse>((resolve, reject) => {
      this.http
        .get<DriversResponse>(visitorUrl, {
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

  getAllTrucks(opt: TruckDriverSearchParams) {
    const token = this.StorageService.desencriptar(llaveToken);
    const { page, keyword, id } = opt;
    let visitorUrl = `${url}/visitors/trucks`;
    if (page && keyword) {
      visitorUrl = `${url}/visitors/trucks?pageNumber=${page}&keyword=${keyword}`;
    } else if (keyword) {
      visitorUrl = `${url}/visitors/trucks?keyword=${keyword}`;
    } else if (page) {
      visitorUrl = `${url}/visitors/trucks?pageNumber=${page}`;
    } else {
      visitorUrl = `${url}/visitors/trucks`;
    }

    return new Promise<TruckDriverResponse>((resolve, reject) => {
      this.http
        .get<TruckDriverResponse>(visitorUrl, {
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
