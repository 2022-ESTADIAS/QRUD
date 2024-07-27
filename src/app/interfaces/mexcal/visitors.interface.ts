export interface VisitorsResponse {
  status: string;
  visitors: Visitor[];
  page: number;
  pages: number;
}

export interface Visitor {
  name: string;
  email: string;
  created_at: Date;
  visit_date: string;
  visit_company: string;
  contact_name: string;
  department_id: string;
  enter_device: string;
  visitor_type_id: VisitorTypeID | null;
  isActive: boolean;
  uid: string;
}
export interface VisitorTypeID {
  _id: string;
  name: string;
}

export interface VisitorSearchParams {
  page?: number;
  keyword?: string;
}
export interface DriverSearchParams extends VisitorSearchParams {}

export interface DriversResponse {
  status: string;
  drivers: Driver[];
  page: number;
  pages: number;
}

export interface Driver {
  company_name: string;
  operator_name: string;
  phone: string;
  email: string;
  office_name: string;
  office_phone: string;
  isActive: boolean;
  uid: string;
}
