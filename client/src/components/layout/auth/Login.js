import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const emailRef= useRef(null)
    const passwordRef = useRef(null)

    const loginUser = (event) => {
        event.preventDefault()
        console.log("success")
    }

    return (
        <div>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Log Back Into Your Account</p>
            <form className="form" onSubmit={loginUser}>
                <div className="form-group">
                <input ref={emailRef} type="email" placeholder="Email Address" name="email" required />
                </div>
                <div className="form-group">
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    )
}

export default Login
