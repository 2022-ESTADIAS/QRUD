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
