export interface Department {
  uid: string;
  name: string;
}
export interface VisitorType {
  uid: string;
  name: string;
}
export interface Devices {
  uid: string;
  name: string;
}
export interface ReasonsForAdmissions {
  uid: string;
  name: string;
}

export interface VisitorForm {
  email: string;
  name: string;
  visit_company: string;
  visit_date: string;
  contact_name: string;
  department_id: string;
  enter_device: string;
  visitor_type_id: string;

  ine_field?: any;
}
export interface DriverForm {
  visit_company: string;
  name: string;
  phone: string;
  email: string;
  office_name: string;
  office_phone: string;
  visitor_type_id: string;
  ine_field?: any;
  driver_licence_field?: any;
}

export interface ProviderForm extends VisitorForm {
  reason_id: string;
  hasVehicle: boolean;
}
export interface QRCode {
  _id: string;
}

export interface QRCodeVisitor {
  _id: string;
  name: string;
  visit_date: string;
  visit_company: string | null;
  contact_name: string;
  enter_device: string;
  department: string;
  visitor_type: string;

  company_name?: string;
  operator_name?: string;
  phone?: string;
  email?: string;
  office_name?: string;
  office_phone?: string;
  ine_field?: string;
  driver_licence_field?: string;
}

export interface QRUser {
  scanDate: string;
  visitorQr: QRCodeVisitor;
}

export interface DepartmentResponse {
  message: string;
  departments: Department[];
}
export interface VisitorTypeResponse {
  message: string;
  visitorTypes: VisitorType[];
}
export interface DevicesResponse {
  message: string;
  devices: Devices[];
}
export interface ReasonsForAdmissionsResponse {
  message: string;
  reasons: ReasonsForAdmissions[];
}

export interface VisitorFormPostResponse {
  message: string;
  status: string;
}

export interface VisitEntriesResponse {
  message: string;
  status: string;
}

export interface VisitorsActiveVerificationResponse {
  status: string;
  message: string;
  access: boolean;
}

export interface UserFromQRCodeResponse {
  status: string;
  message: string;
  user: QRCodeVisitor;
}
