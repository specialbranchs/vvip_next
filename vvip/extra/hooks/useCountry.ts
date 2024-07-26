import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { useDispatch } from "react-redux";
import { CountryType } from "../api/designation/types";


const useCountry = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState<CountryType[]>([]);
  const [countryLoading, setCountryLoading] = useState(false);

  useEffect(() => {
    api.designation
      .retriveCountryData()
      .pipe(
        doOnSubscribe(() => setCountryLoading(true)),
        finalize(() => setCountryLoading(false))
      )
      .subscribe({
        next: (countryData) => {
          setCountry(countryData);
        },
        error: (error) => console.log(error),
      });
  }, [setCountry]);

  return {
    countryLoading,
    country,
  };
};

export default useCountry;
