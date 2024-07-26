import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { useDispatch } from "react-redux";
import { VenueType } from "../api/venue/types";




const useVenue = () => {

  const [venuelist, setVenue] = useState<VenueType[]>([]);
  const [venueLoading, setVenueLoading] = useState(false);

  useEffect(() => {
    api.venue
      .retriveVenueData()
      .pipe(
        doOnSubscribe(() => setVenueLoading(true)),
        finalize(() => setVenueLoading(false))
      )
      .subscribe({
        next: (venueData) => {
          setVenue(venueData);
        },
        error: (error) => console.log(error),
      });
  }, [setVenue]);

  return {
    venueLoading,
    venuelist,
  };
};

export default useVenue;
