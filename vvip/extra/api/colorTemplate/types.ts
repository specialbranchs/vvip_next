import { CountryType } from "../request/types";

export type ColorTemplateType = {
  id: number;
  color: string;
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
  requisition: CountryType;
  template: {
    boundry: string;
    middle: string;
  };
};

export type UploadColorTemplateType = {
  color: string;
  requisition: number;
  grandfather: number;
  father: number;
  son: number;
};

export type UpDateColorTemplateType = {
  id: number;
  color: string;
};

export type sonType = {
  id: number;
  name: string;
  created: string;
};
export type ProviderType = {
  id: number;
  name: string;
  created: string;
  son: Array<sonType>;
  color: string;
};

export type SecurityType = {
  id: number;
  father: Array<ProviderType>;
  name: string;
  created: string;
};
