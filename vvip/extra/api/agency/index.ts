import { Observable, map } from "rxjs";
import client from "../client";
import {
  UploadAgencyType,
  AgencyType,
  UpDateAgencyType,
  SecurityType,
} from "./types";

const retriveAgencyData = (): Observable<any> =>
  client.get<AgencyType[]>("agency/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const updateAgencyData = (data: UpDateAgencyType): Observable<any> =>
  client.put<AgencyType>("agency/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const addAgencyData = (data: UploadAgencyType): Observable<any> =>
  client.post<AgencyType>("agency/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const deleteVanueData = (id: number): Observable<any> =>
  client.patch<AgencyType>("agency/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const retriveSecurityData = (): Observable<any> =>
  client.get<SecurityType>("passtype/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
export default {
  retriveAgencyData,
  updateAgencyData,
  deleteVanueData,
  addAgencyData,
  retriveSecurityData
};
