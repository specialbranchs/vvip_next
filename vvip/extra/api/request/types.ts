import { EventType } from "../event/types";
import { PrintStatus } from "../sb_attendent/types";

export type RequestType = {
  id: 1;
  name: string;
  created: string;
  country: {
    id: number;
    name: string;
    created: string;
  };
};
export type UploadRequestType = {
  event: number;
  agency: number;
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
  profile: null;
  signature: null;
};

export type UserFieldType = {
  id: number;
  designation: string;
  name: string;
};
export type UploadAttendentType = {
  uniqueId: number;
  user: number;
  requisition: number;
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
  profile_name: string;
  signature_name: string;
};

export type UpDateRequestType = {
  id: number;
  name: string;
  country_id: number;
};
export type CountryType = {
  id: number;
  name: string;
};

export type AddressType = {
  id: number;
  name: string;
  bn_name: string;
  thana: Array<{
    id: number;
    name: string;
    bn_name: string;
  }>;
};

export type StatusAttendentType = {
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
  print_status:number;
  printing_status:PrintStatus;
  event:EventType
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
