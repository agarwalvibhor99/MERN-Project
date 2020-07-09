import {API} from "../../backend"

export const getAllProducts = () => {
    return fetch(`${API}/products`,
     {method: "GET"})
    .then(response => {
        return response.json()      //ERROR RESPONSE FROM DBS
    })
    .catch(err => console.log(err)) //CANNOT CONNECT TO DBS
}