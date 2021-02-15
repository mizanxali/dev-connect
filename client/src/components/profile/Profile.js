import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import { Link, useRouteMatch } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = props => {

    const match = useRouteMatch()

    useEffect(() => {
        props.getProfileById(match.params.id)
    }, [])

    return (
        !props.profile.loading && props.profile.profile!==null ? <>
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>

            {props.auth.isAuthenticated && props.auth.loading===false && props.auth.user._id===props.profile.profile.user._id &&
            (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}

            <div className="profile-grid my-1">
                <ProfileTop profile={props.profile.profile} />
                <ProfileAbout profile={props.profile.profile} />
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {props.profile.profile.experience.length>0 ?
                        <>
                            {props.profile.profile.experience.map((exp) => {
                                return <ProfileExperience key={exp._id} experience={exp} />
                            })}
                        </>
                    : <h4>No experience credentials.</h4>}
                </div>
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {props.profile.profile.education.length>0 ?
                        <>
                            {props.profile.profile.education.map((edu) => {
                                return <ProfileEducation key={edu._id} education={edu} />
                            })}
                        </>
                    : <h4>No education credentials.</h4>}
                </div>
                {props.profile.profile.githubUsername && <ProfileGithub username={props.profile.profile.githubUsername} />}
            </div>

        </> :<Spinner />
    )
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        auth: state.auth,
    }
}

const mapDispatchToProps = {
    getProfileById: getProfileById
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
