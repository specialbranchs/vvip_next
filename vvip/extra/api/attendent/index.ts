import { Observable, map } from "rxjs";
import client from "../client";
import {
  UploadAttendentType,
  AttendentType,
  UpDateAttendentType,
} from "./types";
import { StatusAttendentType } from "../request/types";

const retriveAttendentData = (userId: number): Observable<any> =>
  client.get<AttendentType[]>(`attendent/${userId}/`).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const retrivePendingAttendentData = (userId: number): Observable<any> =>
  client.get<StatusAttendentType[]>(`attendentstatus/${userId}/`).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

  const retriveStatusBasedAttendentData = (userId: number,status:number): Observable<any> =>
    client.get<StatusAttendentType[]>(`attendentstatus/${userId}/${status}/`).pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;
  
        return responseData;
      })
    );
  
const retriveSinglePendingAttendentData = (data: any): Observable<any> =>
  client.post<StatusAttendentType>(`attendentstatus/`, data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const retriveUserstatusAttendentData = (data: any): Observable<any> =>
  client.post<StatusAttendentType>(`attendentuserstatus/`, data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const retriveAttendentPrintStatusData = (data: any): Observable<any> =>
  client.post<any>(`printstatus/`, data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const updateAttendentData = (data: UpDateAttendentType): Observable<any> =>
  client.put<AttendentType>("attendent/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const addAttendentData = (data: UploadAttendentType): Observable<any> =>
  client.post<AttendentType>("attendent/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const deleteAttendentData = (id: number): Observable<any> =>
  client.patch<AttendentType>("attendent/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

export default {
  retriveAttendentData,
  updateAttendentData,
  deleteAttendentData,
  addAttendentData,
  retrivePendingAttendentData,
  retriveSinglePendingAttendentData,
  retriveUserstatusAttendentData,
  retriveAttendentPrintStatusData,
  retriveStatusBasedAttendentData
};
