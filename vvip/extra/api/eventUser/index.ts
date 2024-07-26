import { Observable, map } from "rxjs";
import client from "../client";
import { UploadEventUserType, EventUserType, UpDateEventUserType, mailDataType } from "./types";

const retriveEventUserData = (): Observable<any> =>
  client.get<EventUserType[]>("eventUser/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

  const retriveEventWiseUserData = (userId:number): Observable<any> =>
    client.get<EventUserType[]>(`eventUser/${userId}/`).pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;
  
        return responseData;
      })
    );
  
const updateEventUserFormData = (data: any) => {
  let formData = mkformData(data);
  formData.append("id", data.id);
  return formData;
};
const updateEventUserData = (data: UpDateEventUserType): Observable<any> =>
  client.put<EventUserType>("eventUser/", updateEventUserFormData(data)).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const mkformData = (data:any) => {
  const formPayload = new FormData();

  formPayload.append("name", data.name);
  formPayload.append("agency", data.agency);
  formPayload.append("event", data.event);
  formPayload.append("validate_date", data.validate_date);
  formPayload.append("phone", data.phone);
  formPayload.append("email", data.email);
  formPayload.append("number_of_pass", data.number_of_pass);

  formPayload.append("user", JSON.stringify(data.user));
  // });
  let file = data.upload as any;

  formPayload.append("upload", file);

  return formPayload;
};
const addEventUserData = (data: UploadEventUserType): Observable<any> =>
  client
    .post<EventUserType>("eventUser/", mkformData(data), {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;

        return responseData;
      })
    );
const deleteEventUserData = (id: number): Observable<any> =>
  client.patch<EventUserType>("eventUser/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
  const sendEmailUserData = (data: mailDataType): Observable<any> =>
    client.post<any>("sendEmail/", data).pipe(
      map((response) => {
        console.log('res email', response.data)
        const responseData = response.data;
  
        return responseData;
      })
    );

export default {
  retriveEventUserData,
  updateEventUserData,
  deleteEventUserData,
  addEventUserData,
  sendEmailUserData,
  retriveEventWiseUserData
};
