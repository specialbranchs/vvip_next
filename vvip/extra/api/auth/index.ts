import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import client from "../client";
import {
  ChangePassword,
  SignInData,
  UploadUserData,
} from "@/extra/typings/formData";
import { User } from "@/extra/typings/structures";

type SignInResponseData = {
  status: number;
  statusText: string;
  access: string;
  refresh: string;
};

const signInRequest$ = (data: SignInData): Observable<any> =>
  client
    .post<any>("token/", {
      email: data.email,
      password: data.password,
    })
    .pipe(
      map((response) => {
        const data = response.data;
        return data;
      })
    );

const signUpRequest$ = (data: UploadUserData): Observable<any> =>
  client
    .post<any>("register", {
      email: data.email,
      password: data.password,
      name: data.name,
      is_admin: data.is_admin,
      is_staff: data.is_staff,
    })
    .pipe(
      map((response) => {
        const data = response.data;
        return data;
      })
    );

const LogOut = (id: number): Observable<any> =>
  client
    .post<any>("logout/", {
      id: id,
    })
    .pipe(
      map((response) => {
        const data = response.data;
        // console.log('refresh',data)
        return data;
      })
    );
const userList$ = (): Observable<any> =>
  client.get<any>("user").pipe(
    map((response) => {
      const data = response.data;
      return data;
    })
  );

const delUser$ = (id: number): Observable<any> =>
  client
    .put<any>("user", {
      id: id,
    })
    .pipe(
      map((response) => {
        // console.log('res', response.data)
        const responseData = response.data;

        return responseData;
      })
    );

const ResetPassword = (data: ChangePassword): Observable<any> =>
  client.post<any>("change-password", data).pipe(
    map((response) => {
      // console.log('res', response.data)
      const responseData = response.data;

      return responseData;
    })
  );

export default {
  signInRequest$,
  signUpRequest$,
  LogOut,
  userList$,
  delUser$,
  ResetPassword,
};
