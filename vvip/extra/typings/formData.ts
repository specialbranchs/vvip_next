
export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type AppState = {
  appState: string;
};




export type UploadUserData = {
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
  is_staff: boolean;
};

export type ResUserData = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  is_staff: boolean;
  is_superuser: boolean;
};


export type ChangePassword = {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmnewPassword: string;
};
