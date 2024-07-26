import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { Chief_guestType } from "../api/chief_guest/types";

const useGuest = () => {

  const [guestlist, setGuest] = useState<Chief_guestType[]>([]);
  const [guestLoading, setGuestLoading] = useState(false);

  useEffect(() => {
    api.chief_guest
      .retriveChief_guestData()
      .pipe(
        doOnSubscribe(() => setGuestLoading(true)),
        finalize(() => setGuestLoading(false))
      )
      .subscribe({
        next: (guestData) => {
          setGuest(guestData);
        },
        error: (error) => console.log(error),
      });
  }, [setGuest]);

  return {
    guestLoading,
    guestlist,
  };
};

export default useGuest;
