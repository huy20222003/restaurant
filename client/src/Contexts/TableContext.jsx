import { createContext, useCallback, useReducer } from 'react';
import { initTableState, reducer } from '../Reducers/TableReducer/reducer';
import { getAll, getOne, createTable, updateTable, deleteTable } from '../Reducers/TableReducer/action';
import tableApi from '../Service/tableApi';

export const TableContext = createContext();

export const TableProvider = (prop) => {
  const [tableState, dispatch] = useReducer(reducer, initTableState);

  const handleError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { success: false, message: error.message };
    }
  };

  const handleGetAllTables = useCallback(async () => {
    try {
      const response = await tableApi.getAll();
      if (response.data.success) {
        dispatch(getAll(response.data.tables));
      }
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleGetOneTable = useCallback(async (tableId) => {
    try {
      const response = await tableApi.getOne(tableId);
      if (response.data.success) {
        dispatch(getOne(response.data.table));
      }
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }, []);

  const handleCreateTable = async(data)=> {
    try {
      const response = await tableApi.createTable(data);
      dispatch(createTable(response.data.table));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }

  const handleUpdateTable = async(tableId, data)=> {
    try {
      const response = await tableApi.updateTable(tableId, data);
      dispatch(updateTable(response.data.table));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }

  const handleDeleteTable = async(tableId)=> {
    try {
      const response = await tableApi.deleteTable(tableId);
      dispatch(deleteTable(response.data.table));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }


  const tablesData = {
    tableState,
    handleGetAllTables,
    handleGetOneTable,
    handleCreateTable,
    handleUpdateTable,
    handleDeleteTable,
  };

  return (
    <TableContext.Provider value={tablesData}>
      {prop.children}
    </TableContext.Provider>
  );
};
