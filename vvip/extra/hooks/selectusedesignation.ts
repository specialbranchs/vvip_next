import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { useDispatch } from "react-redux";
import { DesignationType } from "../api/designation/types";

const useDesignation = () => {
  const dispatch = useDispatch();
  const [designations, setDesignations] = useState<DesignationType[]>([]);
  const [designationLoading, setDesignationLoading] = useState(false);

  useEffect(() => {
    api.designation
      .retriveDesignationData()
      .pipe(
        doOnSubscribe(() => setDesignationLoading(true)),
        finalize(() => setDesignationLoading(false))
      )
      .subscribe({
        next: (designationData) => {
          setDesignations(designationData);
        },
        error: (error) => console.log(error),
      });
  }, [setDesignations]);

  return {
    designationLoading,
    designations,
  };
};

export default useDesignation;
