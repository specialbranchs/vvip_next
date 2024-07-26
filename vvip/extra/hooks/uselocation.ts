import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { useDispatch } from "react-redux";
import { CountryType } from "../api/request/types";



const useLocation= () => {

  const [location, setLocation] = useState<CountryType[]>([]);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    api.sb_attendent
      .retriveLocationData()
      .pipe(
        doOnSubscribe(() => setLocationLoading(true)),
        finalize(() => setLocationLoading(false))
      )
      .subscribe({
        next: (locationData) => {
          setLocation(locationData);
        },
        error: (error) => console.log(error),
      });
  }, [setLocation]);

  return {
    locationLoading,
    location,
  };
};

export default useLocation;
