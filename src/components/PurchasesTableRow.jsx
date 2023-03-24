import { Link } from "react-router-dom";

function PurchasesTableRow({ item }) {
    let date = new Date(item.purchase.purchaseDate);

    const add0 = function(nb) {
        let result = "" + nb;
        if(nb < 10)
            result = 0 + result;
        return result;
    };

    return (
        <tr>
            <td>{ item.purchase.id }</td>
            <td>{ add0(date.getDate()) + "/" + add0(date.getMonth()) + "/" + date.getFullYear() }</td>
            <td>{ item.totalPrice } Ar</td>
            <td>{ item.delivered }</td>
            <td>
                <Link to={ "/Purchase/" + item.purchase.id } className="text-light">
                    Show details
                </Link>
            </td>
        </tr>
    );
}

export default PurchasesTableRow;