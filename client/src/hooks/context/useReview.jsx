import { useContext } from "react";
//context
import { ReviewContext } from "../../Contexts/ReviewContext";
//------------------------------------------------------------

const useReview = ()=> {
    return useContext(ReviewContext);
}

export default useReview;