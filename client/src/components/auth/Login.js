import React, { useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { showAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import { loginUser } from '../../actions/auth'

const Login = (props) => {
    const emailRef= useRef(null)
    const passwordRef = useRef(null)

    const loginUser = (event) => {
        event.preventDefault()
        props.loginUser(emailRef.current.value, passwordRef.current.value)
    }

    //redirect if logged in
    if(props.isAuthenticated) {
        return <Redirect to='/dashboard' />
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
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    )
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    showAlert: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = {
    showAlert: showAlert,
    loginUser: loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
