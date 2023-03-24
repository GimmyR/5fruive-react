function PurchaseTableRow({ detail }) {
    return (
        <tr>
            <td>{ detail.id }</td>
            <td>{ detail.product.name }</td>
            <td>{ detail.product.price } Ar</td>
            <td>{ detail.quantity }</td>
            <td>{ detail.quantity * detail.product.price } Ar</td>
        </tr>
    );
}

export default PurchaseTableRow;