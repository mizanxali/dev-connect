import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const nameRef = useRef(null)
    const emailRef= useRef(null)
    const passwordRef = useRef(null)
    const password2Ref = useRef(null)

    const registerUser = (event) => {
        event.preventDefault()
        //check if passwords match
        if(passwordRef.current.value !== password2Ref.current.value) {
            console.log("passwords dont match")
        }
        else {
            console.log("success")
        }
    }

    return (
        <div>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={registerUser}>
                <div className="form-group">
                <input ref={nameRef} type="text" placeholder="Name" name="name" required />
                </div>
                <div className="form-group">
                <input ref={emailRef} type="email" placeholder="Email Address" name="email" required />
                <small className="form-text">
                    This site uses Gravatar so if you want a profile image, use a
                    Gravatar email
                </small>
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
                <div className="form-group">
                <input
                    ref={password2Ref}
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    )
}

export default Register
