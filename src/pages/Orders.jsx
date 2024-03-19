import Order from "../components/Order";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { urlOrders } from '../endpoints';

export default function Orders() {
    const [orders, setOrders] = useState([])

    const handleRefreshAfterDelete = () => {
        getOrders();
    }

    useEffect(() => {
        getOrders();
      }, []);

      async function getOrders() {
        try {
            const response = await axios.get(urlOrders);
            setOrders(response.data);
        } catch (error) {
            const errorMessage = "Error: " + error.message;
            console.log(errorMessage);
        }
      }

    return (
        <div>
            {orders.map((order) => {
                const { id } = order
                return <Order key={id} order={order} parentCallback={handleRefreshAfterDelete}/>
            })}
        </div>  
    );
}