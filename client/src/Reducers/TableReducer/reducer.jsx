import { CREATE_TABLE, DELETE_TABLE, GET_ALL_TABLES, GET_ONE_TABLE, UPDATE_TABLE } from './constants';

export const initTableState = {
  table: null,
  tables: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_TABLES:
      return {
        ...state,
        tables: payload,
      };
    case GET_ONE_TABLE:
      return {
        ...state,
        table: payload,
      };
    case CREATE_TABLE:
      return {
        ...state,
        tables: [...state.tables, payload],
      };

      case UPDATE_TABLE:
        const newTables = state.tables.map((table) =>
          table._id === payload._id ? payload : table
        );
        case DELETE_TABLE: {
          return {
            ...state,
            tables: state.tables.filter(
              (table) => table._id !== payload
            ),
          };
        }
        return {
          ...state,
          tables: newTables,
        };
    default:
      return {
        ...state,
      };
  }
};
