import { Observable, map } from "rxjs";
import client from "../client";
import { UploadVenueType, VenueType } from "./types";

const retriveVenueData = (): Observable<any> =>
  client.get<VenueType[]>("venue/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const updateVenueData = (data: VenueType): Observable<any> =>
  client.put<VenueType>("venue/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const addVenueData = (data: UploadVenueType): Observable<any> =>
  client.post<VenueType>("venue/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const deleteVanueData = (id: number): Observable<any> =>
  client.patch<VenueType>("venue/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
export default {
  retriveVenueData,
  updateVenueData,
  deleteVanueData,
  addVenueData,
};
