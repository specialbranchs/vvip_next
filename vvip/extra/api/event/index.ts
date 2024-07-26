import { Observable, map } from "rxjs";
import client from "../client";
import { UploadEventType, EventType, UpDateEventType } from "./types";

const retriveEventData = (): Observable<any> =>
  client.get<EventType[]>("event/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const updateEventFormData = (data: any) => {
  let formData = mkformData(data);
  formData.append("id", data.id);
  return formData;
};
const updateEventData = (data: UpDateEventType): Observable<any> =>
  client.put<EventType>("event/", updateEventFormData(data)).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const mkformData = (data: any) => {
  const formPayload = new FormData();

  formPayload.append("name", data.name);
  formPayload.append("venue", data.venue);
  formPayload.append("organization", data.organization);
  formPayload.append("start_date", data.start_date);
  formPayload.append("end_date", data.end_date);
  formPayload.append("text", data.text);
  formPayload.append("remarks", data.remarks);
  console.log("data.event_guest", data.event_guest);
  // data.event_guest.forEach((item: any) => {
  formPayload.append("event_guest", JSON.stringify(data.event_guest));
  // });
  let file = data.logo as any;

  formPayload.append("logo", file);

  return formPayload;
};
const addEventData = (data: UploadEventType): Observable<any> =>
  client
    .post<EventType>("event/", mkformData(data), {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;

        return responseData;
      })
    );
const deleteVanueData = (id: number): Observable<any> =>
  client.patch<EventType>("event/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

export default {
  retriveEventData,
  updateEventData,
  deleteVanueData,
  addEventData,
};
