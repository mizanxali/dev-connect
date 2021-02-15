import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../actions/auth'

const Navbar = (props) => {

    const authLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/dashboard"><i className='fas fa-user'></i>{' '}<span className='hide-sm'>Dashboard</span></Link></li>
            <li><a onClick={props.logoutUser} href="#!"><i className='fas fa-sign-out-alt'></i>{' '}<span className='hide-sm'>Logout</span></a></li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnect</Link>
            </h1>
            {!props.auth.loading && (<>{props.auth.isAuthenticated ? authLinks : guestLinks}</>)}
        </nav>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = {
    logoutUser: logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
