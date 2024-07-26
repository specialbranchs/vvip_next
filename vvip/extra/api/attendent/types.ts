
import { User } from "@/extra/typings/structures";
import { CountryType } from "../request/types";

export type AttendentType = {
  id: number;
  requisition:CountryType;
  nid: string;
  date_of_birth: string;
  name_en: string;
  name_bn: string;
  email: string;
  designation: string;
  father_en: string;
  father_bn: string;
  phone: string;
  district: CountryType;
  thana: CountryType;
  village: string;
  address: string;
  profile: string;
  signature: string;
  vr_status:Verificate_Status_Type
};

export type UploadAttendentType = {
  user: number;
  requisition:number;
  nid: string;
  date_of_birth: string;
  name_en: string;
  name_bn: string;
  email: string;
  designation: string;
  father_en: string;
  father_bn: string;
  phone: string;
  district: number;
  thana: number;
  village: string;
  address: string;
  profile: string;
  signature: string;
};

export type UpDateAttendentType = {
  id: number;
  name: string;
  country_id: number;
};



export type Verificate_Status_Type={
  id: number;
  created: string;
  status:boolean;
  status_type: CountryType;
  approved_user: User;
}