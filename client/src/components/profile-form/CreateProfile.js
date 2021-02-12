import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { setProfile } from '../../actions/profile'
import { showAlert } from '../../actions/alert'

const CreateProfile = props => {

    const [showSocialInputs, setShowSocialInputs] = useState(false)

    const positionRef = useRef('')
    const organizationRef = useRef('')
    const websiteRef= useRef('')
    const locationRef = useRef('')
    const skillsRef = useRef('')
    const gihtubUsernameRef = useRef('')
    const bioRef= useRef('')
    const twitterRef = useRef('')
    const facebookRef = useRef('')
    const instagramRef = useRef('')
    const youtubeRef = useRef('')
    const linkedinRef = useRef('')

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
            locationRef: locationRef.current.value,
            skills: skillsRef.current.value,
            gihtubUsernameRef: gihtubUsernameRef.current.value,
            bio: bioRef.current.value,
            twitter: twitterRef.current.value,
            facebook: facebookRef.current.value,
            instagram: instagramRef.current.value,
            youtube: youtubeRef.current.value,
            linkedin: linkedinRef.current.value
        }
        props.setProfile(formData, props.history)
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
                <select ref={positionRef} name="position">
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
                <input ref={organizationRef} type="text" placeholder="Organization" name="organization" />
                <small className="form-text">Could be your own organization or one you work for</small>
                </div>
                <div className="form-group">
                <input ref={websiteRef} type="text" placeholder="Website" name="website" />
                <small className="form-text">Could be your own or a organization website</small>
                </div>
                <div className="form-group">
                <input ref={locationRef} type="text" placeholder="Location" name="location" />
                <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                <input ref={skillsRef} type="text" placeholder="* Skills" name="skills" />
                <small className="form-text">Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                <input
                    ref={gihtubUsernameRef}
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                />
                <small className="form-text">If you want your latest repos and a Github link, include your
                    username</small>
                </div>
                <div className="form-group">
                <textarea ref={bioRef} placeholder="A short bio of yourself" name="bio"></textarea>
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
                <input ref={twitterRef} type="text" placeholder="Twitter URL" name="twitter" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input ref={facebookRef} type="text" placeholder="Facebook URL" name="facebook" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input ref={youtubeRef} type="text" placeholder="YouTube URL" name="youtube" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input ref={linkedinRef} type="text" placeholder="Linkedin URL" name="linkedin" />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input ref={instagramRef} type="text" placeholder="Instagram URL" name="instagram" />
                </div>
                </>}

                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </>
    )
}

CreateProfile.propTypes = {
    isAuthenticated: PropTypes.bool,
    setProfile: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = {
    showAlert: showAlert,
    setProfile: setProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile))
