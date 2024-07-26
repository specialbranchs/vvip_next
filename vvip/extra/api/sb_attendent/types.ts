
import { User } from "@/extra/typings/structures";
import { AgencyType } from "../agency/types";
import { EventType } from "../event/types";
import { CountryType, UserFieldType } from "../request/types";

export type SBAttendentType = {
  id: number;
  requisition: CountryType;
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
  vr_status: Verificate_Status_Type;
};

export type UploadSBAttendentType = {
  user: number;
  event: number;
  bp_number: string;
  name: string;
  designation: string;
  posting: string;
  email: string;
  phone: string;
  picture: string;
};

export type UpDateSBAttendentType = {
  id: number;
  name: string;
  country_id: number;
};

export type Verificate_Status_Type = {
  id: number;
  created: string;
  status: boolean;
  status_type: CountryType;
  approved_user: User;
};

export type PrintStatus = {
  middletitle: string;
  boundrytitle: string;
  boundry: string;
  middle: string;
};
export type StatusSBAttendentType = {
  id: number;
  printing_status:PrintStatus
  print_status: number;
  event: EventType;
  agency: AgencyType;
  requisition: CountryType;
  bp_number: string;
  name: string;
  designation: string;
  posting: string;
  email: string;
  phone: string;
  picture: string;
  vr_status: Array<{
    id: null | number;
    status_type: CountryType;
    status: boolean;
    approved_user: UserFieldType | null;
  }>;
  user_status: Array<{
    id: null | number;
    status_type: CountryType;
    status: boolean;
    approved_user: UserFieldType | null;
  }>;
};
