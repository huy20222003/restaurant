import {
  CREATE_RESERVATION,
  GET_ALL_RESERVATIONS,
  FILTER_RESERVATION,
  GET_ALL_BY_ID,
} from './constants';

export const initReservationsState = {
  reservations: [],
  reservation: '',
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_RESERVATIONS:
      return {
        ...state,
        reservations: payload,
      };
      case GET_ALL_BY_ID:
      return {
        ...state,
        reservations: payload,
      };

    case CREATE_RESERVATION: {
      return {
        ...state,
        reservations: [...state.reservations, payload],
      };
    }
    case FILTER_RESERVATION: {
      return {
        ...state,
        reservations: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
