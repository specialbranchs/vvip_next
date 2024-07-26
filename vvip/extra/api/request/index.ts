import { Observable, map } from "rxjs";
import client from "../client";
import {
  UploadRequestType,
  RequestType,
  UpDateRequestType,
} from "./types";

const retriveRequestData = (): Observable<any> =>
  client.get<RequestType[]>("guest_designations/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
  

const updateRequestData = (data: UpDateRequestType): Observable<any> =>
  client.put<RequestType>("guest_designations/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const addRequestData = (data: UploadRequestType): Observable<any> =>
  client.post<RequestType>("guest_designations/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const deleteVanueData = (id: number): Observable<any> =>
  client.patch<RequestType>("guest_designations/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const retriveCountryData = (): Observable<any> =>
  client.get<RequestType>("country/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
  const retriveAddressData = (): Observable<any> =>
    client.get<RequestType>("address/").pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;
  
        return responseData;
      })
    );
  
    const retriveRequisition=():Observable<any>=>
      client.get<any>("requisition/").pipe(
        map((response) => {
          // console.log('res', response.data)
          const responseData = response.data;
    
          return responseData;
        })
      );
export default {
  retriveRequestData,
  updateRequestData,
  deleteVanueData,
  addRequestData,
  retriveCountryData,
  retriveAddressData,
  retriveRequisition
};
