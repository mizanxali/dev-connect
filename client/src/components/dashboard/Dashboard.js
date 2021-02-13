import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'

const Dashboard = props => {

    //runs once when component is mounted
    useEffect(() => {
        props.getCurrentProfile()
    }, [])

    //redirect if not logged in
    if(!props.auth.isAuthenticated && !props.auth.loading) {
        return <Redirect to='/login' />
    }

    return (
        props.profile.loading && props.profile.profile===null ? <Spinner /> : <>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'><i className='fas fa-user'></i> Welcome {props.auth.user && props.auth.user.name}</p>
            {props.profile.profile!==null ? <><DashboardActions /></> : <>
                <p>You have not created a profile yet.</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>Create one now.</Link>
            </>}
        </>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profile
    }
}

const mapDispatchToProps = {
    getCurrentProfile: getCurrentProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
