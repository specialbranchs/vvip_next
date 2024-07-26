import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { OrganizationType } from "../api/organization/types";





const useOrganization = () => {

  const [organizationlist, setOrganization] = useState<OrganizationType[]>([]);
  const [organizationLoading, setOrganizationLoading] = useState(false);

  useEffect(() => {
    api.organization
      .retriveOrganizationData()
      .pipe(
        doOnSubscribe(() => setOrganizationLoading(true)),
        finalize(() => setOrganizationLoading(false))
      )
      .subscribe({
        next: (organizationData) => {
          setOrganization(organizationData);
        },
        error: (error) => console.log(error),
      });
  }, [setOrganization]);

  return {
    organizationLoading,
    organizationlist,
  };
};

export default useOrganization;
