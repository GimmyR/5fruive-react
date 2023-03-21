import { useParams } from "react-router-dom";
import Home from "./Home";

function Vegetables({ cartST }) {
    const { subcategoryId } = useParams();

    return (
        <Home cartST={cartST} subcategoryId={subcategoryId}/>
    );
}

export default Vegetables;