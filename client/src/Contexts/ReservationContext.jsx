import { createContext, useCallback, useReducer } from 'react';
import { initReservationsState, reducer } from '../Reducers/ReservationReducer/reducer';
import { getAll, createReservation, filterReservation } from '../Reducers/ReservationReducer/action';
import reservationApi from '../Service/reservationApi';

export const ReservationContext = createContext();

export const ReservationProvider = (prop) => {
  const [reservationState, dispatch] = useReducer(reducer, initReservationsState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleGetAllReservations = useCallback(async () => {
    try {
      const response = await reservationApi.getReservation();
      if (response.data.success) {
        dispatch(getAll(response.data.reservations));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleGetAllReservationsById = useCallback(async () => {
    try {
      const response = await reservationApi.getAllById();
      if (response.data.success) {
        dispatch(getAll(response.data.reservations));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreateReservation = async(data)=> {
    try {
      const response = await reservationApi.createReservation(data);
      dispatch(createReservation(response.data.reservation));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }

  const handleFilterReservation = async(data)=> {
    try {
      const response = await reservationApi.filterReservation(data);
      dispatch(filterReservation(response.data.reservations));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }


  const reservationData = {
    reservationState,
    handleGetAllReservations,
    handleGetAllReservationsById,
    handleCreateReservation,
    handleFilterReservation,
  };

  return (
    <ReservationContext.Provider value={reservationData}>
      {prop.children}
    </ReservationContext.Provider>
  );
};
