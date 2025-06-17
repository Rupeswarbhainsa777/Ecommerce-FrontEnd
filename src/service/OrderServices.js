import axios from "axios";

export const latestOrder = async () => {
    return await axios.get(
        `http://localhost:9091/api/v1.0/orders/latest`,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            }
        }
    );
};
export const createOrder = async (order) => {
    return await axios.post(
        `http://localhost:9091/api/v1.0/orders`,order,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    )
}

export const deleteOrder = async (id) => {
    return await axios.delete(`http://localhost:9091/api/v1.0/orders/${id}` ,{
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
}