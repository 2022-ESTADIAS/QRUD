interface Routes {
  name: string;
  link: string;
  _id: string;
  english_name: string;
}

export interface Module {
  icon: string;
  module_name: string;
  routes: Routes[];
  role_id: string;
  uid: string;
  english_name: string;
}

export interface ModuleResponse {
  msg: string;
  modules: Module[];
}
