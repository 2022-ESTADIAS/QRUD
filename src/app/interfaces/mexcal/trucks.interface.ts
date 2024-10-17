export interface SearchParams {
  page?: number;
  keyword?: string;
}

export interface TruckResponse {
  message: string;
  trucks: Truck[];
  page: number;
  pages: number;
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
