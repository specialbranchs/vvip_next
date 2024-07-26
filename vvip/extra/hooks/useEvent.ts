import { useEffect, useState } from "react";
import { finalize } from "rxjs/operators";
import { doOnSubscribe } from "../utils/rxjs.utils";
import api from "../api";
import { useDispatch } from "react-redux";
import { EventType } from "../api/event/types";




const useEvent = () => {

  const [eventlist, setEvent] = useState<EventType[]>([]);
  const [eventLoading, setEventLoading] = useState(false);

  useEffect(() => {
    api.event
      .retriveEventData()
      .pipe(
        doOnSubscribe(() => setEventLoading(true)),
        finalize(() => setEventLoading(false))
      )
      .subscribe({
        next: (eventData) => {
          setEvent(eventData);
        },
        error: (error) => console.log(error),
      });
  }, [setEvent]);

  return {
    eventLoading,
    eventlist,
  };
};

export default useEvent;
