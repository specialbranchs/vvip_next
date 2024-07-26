import { Observable, map } from "rxjs";
import client from "../client";
import { UploadChief_guestType, Chief_guestType, UpDateChief_guestType } from "./types";

const retriveChief_guestData = (): Observable<any> =>
  client.get<Chief_guestType[]>("chief_guest/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const updateChief_guestData = (data: UpDateChief_guestType): Observable<any> =>
  client.put<Chief_guestType>("chief_guest/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const addChief_guestData = (data: UploadChief_guestType): Observable<any> =>
  client.post<Chief_guestType>("chief_guest/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const deleteVanueData = (id: number): Observable<any> =>
  client.patch<Chief_guestType>("chief_guest/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
export default {
  retriveChief_guestData,
  updateChief_guestData,
  deleteVanueData,
  addChief_guestData,
};
