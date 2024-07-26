import { Chief_guestType } from "../chief_guest/types";
import { OrganizationType } from "../organization/types";
import { VenueType } from "../venue/types";


export type EventType = {
  id: number;
  event_guest: Array<{
    id: number;
    created: string;
    guest: Chief_guestType;
  }>;
  logo: string;
  name: string;
  start_date: string;
  end_date: string ;
  text: string;
  remarks:string
  created: string;
  venue: VenueType;
  organization: OrganizationType;
};

export type UploadEventType = {
 venue: number,
 organization: number,
 name:string,
 logo: null|string,
 start_date:string,
 end_date:string,
 text:string,
 remarks:string,
 event_guest:Array<number>
};

export type UpDateEventType = {
  id: number;
  venue: number,
  organization: number,
  name:string,
  logo: null|string,
  start_date:string,
  end_date:string,
  text:string,
  remarks:string,
  event_guest:Array<number>
};
