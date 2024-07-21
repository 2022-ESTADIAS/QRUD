export interface Department {
  uid: string;
  name: string;
}
export interface VisitorType {
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
