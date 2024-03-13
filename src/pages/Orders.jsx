import Order from "../components/Order";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { urlOrders } from '../endpoints';

export default function Orders() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        axios.get(urlOrders)
          .then((response) => {
            console.log(response.data);
            setOrders(response.data);
          })
      }, [])

    return (
        <div>
            {orders.map((order) => {
                const { id } = order
                return <Order key={id} order={order} />
            })}
        </div>  
    );
}