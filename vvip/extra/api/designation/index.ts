import { Observable, map } from "rxjs";
import client from "../client";
import {
  UploadDesignationType,
  DesignationType,
  UpDateDesignationType,
} from "./types";

const retriveDesignationData = (): Observable<any> =>
  client.get<DesignationType[]>("guest_designations/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const updateDesignationData = (data: UpDateDesignationType): Observable<any> =>
  client.put<DesignationType>("guest_designations/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const addDesignationData = (data: UploadDesignationType): Observable<any> =>
  client.post<DesignationType>("guest_designations/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const deleteVanueData = (id: number): Observable<any> =>
  client.patch<DesignationType>("guest_designations/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const retriveCountryData = (): Observable<any> =>
  client.get<DesignationType>("country/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
export default {
  retriveDesignationData,
  updateDesignationData,
  deleteVanueData,
  addDesignationData,
  retriveCountryData,
};
