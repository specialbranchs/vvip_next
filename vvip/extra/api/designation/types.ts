

export type DesignationType = {
  id: 1;
  name: string;
  created: string;
  country: {
    id: number;
    name: string;
    created: string;
  };
};
export type UploadDesignationType = {
  name: string;
  country_id: number;
};

export type UpDateDesignationType = {
  id: number;
  name: string;
  country_id: number;
};
export type CountryType = {
  id: number;
  name: string;
};
