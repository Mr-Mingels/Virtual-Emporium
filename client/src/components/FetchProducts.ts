import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function FetchProducts() {
    const [allProducts, setAllProducts] = useState(null)

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/products`);
            if (response) {
                setAllProducts(response.data)
            } else {
                console.log('Error: Products Not Found!')
            }
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        fetchAllProducts();
    }, []);

    return { allProducts }
}
