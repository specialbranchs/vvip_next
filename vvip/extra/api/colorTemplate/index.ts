import { Observable, map } from "rxjs";
import client from "../client";
import {
  UploadColorTemplateType,
  ColorTemplateType,
  UpDateColorTemplateType,
  SecurityType,
} from "./types";

const retriveColorTemplateData = (): Observable<any> =>
  client.get<ColorTemplateType[]>("colortemplate/").pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

const addColorTemplateData = (data: UploadColorTemplateType): Observable<any> =>
  client.post<ColorTemplateType>("colortemplate/", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );
const deleteVanueData = (id: number): Observable<any> =>
  client.patch<ColorTemplateType>("colortemplate/", { id: id }).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

  const updateColorTemplateData = (data: UpDateColorTemplateType): Observable<any> =>
    client.put<ColorTemplateType>("colortemplate/", data).pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;
  
        return responseData;
      })
    );
export default {
  retriveColorTemplateData,
  deleteVanueData,
  addColorTemplateData,
  updateColorTemplateData
};
