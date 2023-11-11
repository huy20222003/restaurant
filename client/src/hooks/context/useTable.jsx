import { useContext } from "react";
//context
import { TableContext } from "../../Contexts/TableContext";
//------------------------------------------------------------

const useTable = ()=> {
    return useContext(TableContext);
}

export default useTable;