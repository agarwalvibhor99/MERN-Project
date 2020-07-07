import React, {useState} from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { signup } from "../auth/helper"

//STORING DATA FROM FORM -> In STATES -> and then manage that into a body to send to backend

const Signup = () => {


    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error:"",
        success: false
    })

    const {name, email, password, error, success} = values

    //Common function to handle all changes //High Order Function
    const handleChange = name => event =>{
        setValues({...values, error:false, [name]: event.target.value})                        //...values : Loads all existing values
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})     //This will give a response// done in auth file
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }
            else{
                setValues({...values,
                name: "",
                email: "",
                password: "",
                error: "",
                success: true
            })
            }
        })
        .catch(console.log("Error in Signup"))
    }
    const signUpForm = () => {

        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input value={name} className="form-control" onChange={handleChange("name")} type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email ID</label>
                            <input value={email} className="form-control" onChange={handleChange("email")} type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input value={password} className="form-control" onChange={handleChange("password")} type="password" />
                        </div>
                        <button onClick = {onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                    
                </div>    
            </div>
        )
    }

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        New Account created successfully. Please <Link to="/signin"> Login Here</Link>     
                    </div>
                </div>
            </div>
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

    return(
        <Base title={"Signup"} description="User Sign up page ">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup


//////ERROR MESSAGE ON INCORRECT EMAIL ID NOT WORKING BACKEND ROUTE ERROR NOT WOKRING