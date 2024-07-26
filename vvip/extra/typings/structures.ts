import { AgencyType } from "../api/agency/types";
import { EventType } from "../api/event/types";


export type User = {
  id: number;
  refresh: string;
  access: string;
  email: string;
  name:string;
  agency:AgencyType;
  event:EventType;
  is_superuser:boolean;
  is_adminuser:boolean;
  is_staff:boolean;

};

export type Designation = {
  id: number;
  title: string;
}

export type ReportSearch = {
  title: string,
  catagory: string
}