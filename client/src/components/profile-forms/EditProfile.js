import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { setProfile, getCurrentProfile } from '../../actions/profile'
import { showAlert } from '../../actions/alert'

const EditProfile = props => {

    const [showSocialInputs, setShowSocialInputs] = useState(false)

    const positionRef = useRef('')
    const organizationRef = useRef('')
    const websiteRef= useRef('')
    const locationRef = useRef('')
    const skillsRef = useRef('')
    const githubUsernameRef = useRef('')
    const bioRef= useRef('')
    const twitterRef = useRef('')
    const facebookRef = useRef('')
    const instagramRef = useRef('')
    const youtubeRef = useRef('')
    const linkedinRef = useRef('')

     //fetch current profile
     useEffect(() => {
        props.getCurrentProfile()
    }, [props.profile.profile.loading])

    // redirect if not logged in
    if(!props.isAuthenticated) {
        return <Redirect to='/login' />
    }

    const setProfile = (event) => {
        event.preventDefault()
        const formData = {
            position: positionRef.current.value,
            organization: organizationRef.current.value,
            website: websiteRef.current.value,
            location: locationRef.current.value,
            skills: skillsRef.current.value,
            githubUsernameRef: githubUsernameRef.current.value,
            bio: bioRef.current.value,
            twitter: twitterRef.current.value,
            facebook: facebookRef.current.value,
            instagram: instagramRef.current.value,
            youtube: youtubeRef.current.value,
            linkedin: linkedinRef.current.value
        }
        props.setProfile(formData, props.history, true)
    }

    return (
        <>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your profile stand out
            </p>
            <small>* = required field</small>
            <form onSubmit={setProfile} className="form">
                <div className="form-group">
                <select defaultValue={props.profile.profile.loading || !props.profile.profile.position ? '' : props.profile.profile.position} ref={positionRef} name="position">
                    <option value="">* Select Professional Status / Position</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                <input defaultValue={props.profile.profile.loading || !props.profile.profile.organization ? '' : props.profile.profile.organization} ref={organizationRef} type="text" placeholder="Organization" name="organization" />
                <small className="form-text">Could be your own organization or one you work for</small>
                </div>
                <div className="form-group">
                <input defaultValue={props.profile.profile.loading || !props.profile.profile.website ? '' : props.profile.profile.website} ref={websiteRef} type="text" placeholder="Website" name="website" />
                <small className="form-text">Could be your own or a organization website</small>
                </div>
                <div className="form-group">
                <input defaultValue={props.profile.profile.loading || !props.profile.profile.location ? '' : props.profile.profile.location} ref={locationRef} type="text" placeholder="Location" name="location" />
                <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                <input defaultValue={props.profile.profile.loading || !props.profile.profile.skills ? '' : props.profile.profile.skills.join(',')} ref={skillsRef} type="text" placeholder="* Skills" name="skills" />
                <small className="form-text">Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                <input
                    defaultValue={props.profile.profile.loading || !props.profile.profile.githubUsername ? '' : props.profile.profile.githubUsername}
                    ref={githubUsernameRef}
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                />
                <small className="form-text">If you want your latest repos and a Github link, include your
                    username</small>
                </div>
                <div className="form-group">
                <textarea defaultValue={props.profile.profile.loading || !props.profile.profile.bio ? '' : props.profile.profile.bio} ref={bioRef} placeholder="A short bio of yourself" name="bio"></textarea>
                <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                <button onClick={() => setShowSocialInputs(!showSocialInputs)} type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
                </div>

                {showSocialInputs && <>
                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input defaultValue={props.profile.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.twitter} ref={twitterRef} type="text" placeholder="Twitter URL" name="twitter" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input defaultValue={props.profile.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.facebook} ref={facebookRef} type="text" placeholder="Facebook URL" name="facebook" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input defaultValue={props.profile.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.youtube} ref={youtubeRef} type="text" placeholder="YouTube URL" name="youtube" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input defaultValue={props.profile.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.linkedin} ref={linkedinRef} type="text" placeholder="Linkedin URL" name="linkedin" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input defaultValue={props.profile.profile.loading || !props.profile.profile.social ? '' : props.profile.profile.social.instagram} ref={instagramRef} type="text" placeholder="Instagram URL" name="instagram" />
                </div>
                </>}

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    )
}

EditProfile.propTypes = {
    isAuthenticated: PropTypes.bool,
    profile: PropTypes.object.isRequired,
    setProfile: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profile: state.profile
    }
}

const mapDispatchToProps = {
    showAlert: showAlert,
    setProfile: setProfile,
    getCurrentProfile: getCurrentProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile))
