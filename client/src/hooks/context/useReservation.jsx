import { useContext } from "react";
//context
import { ReservationContext } from "../../Contexts/ReservationContext";
//------------------------------------------------------------

const useReservation = ()=> {
    return useContext(ReservationContext);
}

export default useReservation;