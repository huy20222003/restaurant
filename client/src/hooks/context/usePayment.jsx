import { useContext } from "react";
//context
import { PaymentContext } from "../../Contexts/PaymentContext";
//------------------------------------------------------------

const usePayment = ()=> {
    return useContext(PaymentContext);
}

export default usePayment;