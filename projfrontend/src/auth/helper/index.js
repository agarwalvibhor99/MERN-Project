import {API} from "../../backend"


export const signup = user => {             //User from fronend as json
    return fetch(`${API}/signup`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)          //sending this to backend. Similar to POSTMAN body
    })
    .then(response => {               //if success
        return response.json()          
    })  
    .catch(err => console.log(err))             //If Error
}

export const signin = user => {             //User from fronend as json
    return fetch(`${API}/signin`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(user)          //sending this to backend. Similar to POSTMAN body
    })
    .then(response => {               //if success
        return response.json()          
    })  
    .catch(err => console.log(err))             //If Error
}

export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){       //if accessible
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const signout = next => {             //User from fronend as json
    if(typeof window !== "undefined"){       //if accessible
        localStorage.removeItem("jwt")
        next()

        return fetch(`${API}/signout`, {
            method: "GET"
        })
        .then(response => console.log("Successfuly Signed out"))
        .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false                    //NOT AUTHENTICATED
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))          //Later in front end check if token is same for the use we are logging  in
    }
    else{               //Dow we need it
        return false;
    }

}