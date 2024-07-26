import { Observable, map } from "rxjs";
import client from "../client";
import {
  UploadSBAttendentType,
  SBAttendentType,
  UpDateSBAttendentType,
  StatusSBAttendentType,
} from "./types";
import { CountryType } from "../request/types";

const retriveSBAttendentData = (userId: number): Observable<any> =>
  client.get<StatusSBAttendentType[]>(`sb_attendent/${userId}/`).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const retrivePendingSBAttendentData = (userId: number): Observable<any> =>
  client.get<StatusSBAttendentType[]>(`sb_attendentstatus/${userId}/`).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

  const retriveStatusBasedSBAttendentData = (eventId: number,status:number): Observable<any> =>
    client.get<StatusSBAttendentType[]>(`sb_attendentstatus/${eventId}/${status}/`).pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;
  
        return responseData;
      })
    );
  
const retriveSinglePendingSBAttendentData = (data: any): Observable<any> =>
  client.post<StatusSBAttendentType>(`sb_attendentstatus/`, data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const retriveUserstatusSBAttendentData = (data: any): Observable<any> =>
  client.post<StatusSBAttendentType>(`sb_attendentuserstatus/`, data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const retriveSBAttendentPrintStatusData = (data: any): Observable<any> =>
  client.post<any>(`sb_printstatus/`, data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const updateSBAttendentData = (data: UpDateSBAttendentType): Observable<any> =>
  client.put<SBAttendentType>("sb_attendent/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const addSBAttendentData = (data: UploadSBAttendentType): Observable<any> =>
  client.post<any>("sb_attendentupload/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const deleteSBAttendentData = (id: number): Observable<any> =>
  client.patch<SBAttendentType>("sb_attendent/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

  const retriveLocationData = (): Observable<any> =>
    client.get<CountryType[]>(`location/`).pipe(
      map((response) => {
        const responseData = response.data;
        return responseData;
      })
    );
export default {
  retriveSBAttendentData,
  updateSBAttendentData,
  deleteSBAttendentData,
  addSBAttendentData,
  retrivePendingSBAttendentData,
  retriveSinglePendingSBAttendentData,
  retriveUserstatusSBAttendentData,
  retriveSBAttendentPrintStatusData,
  retriveStatusBasedSBAttendentData,
  retriveLocationData
};
