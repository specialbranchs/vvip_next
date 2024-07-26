import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { useDispatch } from "react-redux";
import { AgencyType } from "../api/agency/types";




const useAgency = () => {

  const [agencylist, setAgency] = useState<AgencyType[]>([]);
  const [agencyLoading, setAgencyLoading] = useState(false);

  useEffect(() => {
    api.agency
      .retriveAgencyData()
      .pipe(
        doOnSubscribe(() => setAgencyLoading(true)),
        finalize(() => setAgencyLoading(false))
      )
      .subscribe({
        next: (agencyData) => {
          setAgency(agencyData);
        },
        error: (error) => console.log(error),
      });
  }, [setAgency]);

  return {
    agencyLoading,
    agencylist,
  };
};

export default useAgency;
