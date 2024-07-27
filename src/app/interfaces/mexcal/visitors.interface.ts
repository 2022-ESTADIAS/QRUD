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
  visitor_type_id: string;
  isActive: boolean;
  uid: string;
}

export interface VisitorSearchParams {
  page?: number;
  keyword?: string;
}
