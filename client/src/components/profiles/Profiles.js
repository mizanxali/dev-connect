import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = props => {

    useEffect(() => {
        props.getProfiles()
    }, [])

    return (
        props.profile.loading && props.profile.profile===null ? <Spinner /> : <>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'><i className='fab fa-connectdevelop'></i> Browse and connect with developers.</p>
            <div className='profiles'>
                {props.profile.profiles.length>0 ? 
                    props.profile.profiles.map((profile) => {
                        return <ProfileItem key={profile._id} profile={profile} />
                    })
                : <h4>No profiles found.</h4>}
            </div>
        </>
    )
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = {
    getProfiles: getProfiles
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
