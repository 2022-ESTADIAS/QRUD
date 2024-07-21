export interface Department {
  uid: string;
  name: string;
}
export interface VisitorType {
  uid: string;
  name: string;
}

export interface DepartmentResponse {
  message: string;
  departments: Department[];
}
export interface VisitorTypeResponse {
  message: string;
  visitorTypes: VisitorType[];
}
