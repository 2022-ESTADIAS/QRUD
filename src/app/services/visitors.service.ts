import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import {
  DriverSearchParams,
  DriversResponse,
  VisitorSearchParams,
  VisitorsResponse,
} from '../interfaces/mexcal/visitors.interface';

const { url, llaveToken } = environment;

@Injectable({
  providedIn: 'root',
})
export class VisitorsService {
  constructor(
    private http: HttpClient,
    private StorageService: StorageService
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