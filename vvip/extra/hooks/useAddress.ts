import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { AddressType } from "../api/request/types";




const useAddress = () => {

  const [addresslist, setAddress] = useState<AddressType[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);

  useEffect(() => {
    api.request
      .retriveAddressData()
      .pipe(
        doOnSubscribe(() => setAddressLoading(true)),
        finalize(() => setAddressLoading(false))
      )
      .subscribe({
        next: (addressData) => {
          setAddress(addressData);
        },
        error: (error) => console.log(error),
      });
  }, [setAddress]);

  return {
    addressLoading,
    addresslist,
  };
};

export default useAddress;
