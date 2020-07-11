export const addItemToCart = (item, next) =>{  //Next for callback to transfer to cart page
    let cart = []
    if(typeof window !== undefined ){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({...item})
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }

}

export const loadCart = () => {
    if(typeof window !== undefined ){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }

}


//Section 17 vid 5 not updating more than one item in browser local memory