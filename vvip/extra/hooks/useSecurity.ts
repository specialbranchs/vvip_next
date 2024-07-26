import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { useDispatch } from "react-redux";
import { SecurityType } from "../api/agency/types";



const useSecurity = () => {

  const [security, setSecurity] = useState<SecurityType[]>([]);
  const [securityLoading, setSecurityLoading] = useState(false);

  useEffect(() => {
    api.agency
      .retriveSecurityData()
      .pipe(
        doOnSubscribe(() => setSecurityLoading(true)),
        finalize(() => setSecurityLoading(false))
      )
      .subscribe({
        next: (securityData) => {
          setSecurity(securityData);
        },
        error: (error) => console.log(error),
      });
  }, [setSecurity]);

  return {
    securityLoading,
    security,
  };
};

export default useSecurity;
