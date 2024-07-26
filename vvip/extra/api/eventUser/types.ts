
import { AgencyType } from "../agency/types";
import { EventType } from "../event/types";

export type EventUserType = {
  id: number;
  agency: AgencyType;
  event: EventType;
  name: string;
  phone: string;
  email: string;
  upload: null | string;
  validate_date: string;
  number_of_pass: number;
  quota:number;
  create:string,
  access:Array<{
    access:string;
  }>
};

export type UploadEventUserType = {
  user:number
  agency: number;
  event: number;
  name: string;
  phone: string;
  email: string;
  upload: null | string;
  validate_date: string;
  number_of_pass: number;
};

export type UpDateEventUserType = {
  id: number;
  agency: number;
  event: number;
  name: string;
  phone: string;
  email: string;
  upload: null | string;
  validate_date: string;
  number_of_pass: number;
};

export type mailDataType={
  email:string;
  upload:string;
  access:string;

}