import { API } from "../../backend";

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//success message to toastify

//Get All Categories
export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


//product calls

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


//Get All Products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//Delete a produce
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        }  
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


//get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };


//update a product
export const updateProduct = (productId, userId, token, product) => {
    console.log(`Product Id: ${productId}, userId: ${userId}, token: ${token}, Product: ${product}`)//
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: product
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}