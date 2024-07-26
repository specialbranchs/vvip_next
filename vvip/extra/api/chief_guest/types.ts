export type Chief_guestType = {
  id: number;
  name: string;
  remarks: string;
  created: string;
  designation: {
    id: 1;
    name: string;
    created: string;
    country: {
      id: number;
      name: string;
      created: string;
    };
  };
};
export type UploadChief_guestType = {
  name: string;
  remarks: string;
  designation_id: number;
};

export type UpDateChief_guestType = {
  id: number;
  name: string;
  remarks: string;
  designation_id: number;
};
