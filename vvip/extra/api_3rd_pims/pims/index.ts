import { Observable, map } from "rxjs";
import client from "../client";
import { SB_AttendentType } from "./types";

const retriveSBAttendentData = (bp:string): Observable<any> =>
    client.get<SB_AttendentType[]>(`bpinfo/BP${bp}`).pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;
  
        return responseData;
      })
    );

export default { retriveSBAttendentData };
