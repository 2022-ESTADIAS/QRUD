export interface SearchParams {
  page?: number;
  keyword?: string;
}
export interface DraftTruck {
  name: string;
  email: string;
  company: string;
  tract: string;
  brand: string;
  year: string;
  vin: string;
  model: string;
}

export interface Truck {
  name: string;
  email: string;
  company: string;
  tract: string;
  brand: string;
  year: string;
  vin: string;
  model: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  uid: string;
}

export interface TruckResponse {
  message: string;
  trucks: Truck[];
  page: number;
  pages: number;
}

export interface OneTruckResponse {
  message: string;
  truck: Truck;
  qr: string;
}

export interface DeleteTruckResponse {
  status: string;
  message: string;
}
export interface UpdateTruckResponse {
  message: string;
}
export interface CreateTruckResponse {
  message: string;
  truck: Truck;
}
