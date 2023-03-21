import { useParams } from "react-router-dom";
import Home from "./Home";

function Fruits({ cartST }) {
    const { subcategoryId } = useParams();

    return (
        <Home cartST={cartST} subcategoryId={subcategoryId}/>
    );
}

export default Fruits;