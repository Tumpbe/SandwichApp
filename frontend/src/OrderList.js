import './common.css';

function OrderList(props) {
  return (
    <div className="orderContainer">
      <h3 className="orderText">Order queue: </h3>
      <table className="orders">
        <thead>
          <tr>
            <td className="th">Order id</td>
            <td className="th">Sandwich</td>
            <td className="th">Status</td>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order) => {
            const sandwich = props.sandwiches.find((sw) => sw.id === order.sandwichid);
            return <tr key={order.id} className="tr">
              <td className="td">{order.id}</td>
              <td className="td">{sandwich ? sandwich.name : ''}</td>
              <td className="td">{order.status}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList;