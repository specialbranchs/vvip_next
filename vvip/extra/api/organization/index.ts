import { Observable, map } from "rxjs";
import client from "../client";
import { UploadOrganizationType, OrganizationType } from "./types";

const retriveOrganizationData = (): Observable<any> =>
  client.get<OrganizationType[]>("organization/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const updateOrganizationData = (data: OrganizationType): Observable<any> =>
  client.put<OrganizationType>("organization/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const addOrganizationData = (data: UploadOrganizationType): Observable<any> =>
  client.post<OrganizationType>("organization/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const deleteVanueData = (id: number): Observable<any> =>
  client.patch<OrganizationType>("organization/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
export default {
  retriveOrganizationData,
  updateOrganizationData,
  deleteVanueData,
  addOrganizationData,
};
