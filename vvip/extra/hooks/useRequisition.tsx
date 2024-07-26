import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { CountryType } from "../api/request/types";





const useRequisition = () => {

  const [requisitionlist, setRequisition] = useState<CountryType[]>([]);
  const [requisitionLoading, setRequisitionLoading] = useState(false);

  useEffect(() => {
    api.request
      .retriveRequisition()
      .pipe(
        doOnSubscribe(() => setRequisitionLoading(true)),
        finalize(() => setRequisitionLoading(false))
      )
      .subscribe({
        next: (requisitionData) => {
          setRequisition(requisitionData);
        },
        error: (error) => console.log(error),
      });
  }, [setRequisition]);

  return {
    requisitionLoading,
    requisitionlist,
  };
};

export default useRequisition;
