import { Observable, map } from "rxjs";
import client from "../client";
import { ReportType } from "./types";

const retriveReportData = (): Observable<any> =>
  client.get<ReportType>("report/").pipe(
    map((response) => {
      const responseData = response.data;
      return responseData;
    })
  );

const retrivePassData = (userId: number): Observable<any> =>
  client.get<any>(`numberofpass/${userId}`).pipe(
    map((response) => {
      const responseData = response.data;
      return responseData;
    })
  );

export default { retriveReportData, retrivePassData };
