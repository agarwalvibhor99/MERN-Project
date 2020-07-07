import React, {useState} from "react"
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom"
import {signin, authenticate, isAuthenticated} from "../auth/helper" //index.js

const Signin = () => {

    const [values, setValues] = useState({
        email:"ravi@gmail.com",
        password: "12345",
        error: "",
        loading: false,
        didRedirect: false
    })

    const {email, password, error, loading, didRedirect} = values

    const {user} = isAuthenticated()

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]: event.target.value})                        //...values : Loads all existing values
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading:true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }
            else{
                authenticate(data, () => {
                    setValues({...values, didRedirect:true})        //loading:false
                })
            }
        })
        .catch(console.log("signup request failed. Couldn't interact to databse"))
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){           //coming from is authenticated line 18
                return <Redirect to="/admin/dashboard" />
            }
            else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        } 
    } 

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )        
        )
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                    {error}     
                    </div>
                </div>  
            </div>
        )
    } 

    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email ID</label>
                            <input value = {email} onChange={handleChange("email")}  className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input value = {password} onChange={handleChange("password")}  className="form-control" type="password" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form> 
                </div>    
            </div>
        )
    }

    return(
        <Base title={"Signin"} description="User Sign in page">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect}
            <p className="text-white text-center">{JSON.stringify(values)}</p> 
        </Base>
    )
}

export default Signin