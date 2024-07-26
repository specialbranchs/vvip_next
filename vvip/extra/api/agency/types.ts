
export type AgencyType = {
  id: number;
  name: string;
  remarks: string;
  created: string;
  grandfather: {
    id: number;
    name: string;
    created: string;
  };
  father: {
    id: number;
    name: string;
    color: string;
    created: string;
  };
  son: {
    id: number;
    name: string;
    created: string;
  };
};

export type UploadAgencyType = {
  name: string;
  remarks: string;
  grandfather: number;
  father: number;
  son:number;
};

export type UpDateAgencyType = {
  id: number;
  name: string;
  remarks: string;
};

export type sonType={
  id: number;
  name: string;
  created: string;

}
export type ProviderType = {
  id: number;
  name: string;
  created: string;
  son:Array<sonType>;
  color: string;
};

export type SecurityType = {
  id: number;
  father: Array<ProviderType>;
  name: string;
  created: string;
};
