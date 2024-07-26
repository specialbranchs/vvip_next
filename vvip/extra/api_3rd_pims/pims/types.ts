import { CountryType } from "../../api/request/types";

export type SB_AttendentType = {
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

export type SB_UploadAttendentType = {
    user: number;
    event: number;
    agency:number;
    requisition:number;
    bp_number: string;
    name: string;
    designation: string;
    posting: string;
    email: string;
    phone: string;
    picture: string;
  };