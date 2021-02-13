import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { addExperience } from '../../actions/profile'
import { showAlert } from '../../actions/alert'

const AddExperience = (props) => {

    const [toDateDisabled, setToDateDisabled] = useState(false)

    const titleRef = useRef('')
    const organizationRef = useRef('')
    const locationRef= useRef('')
    const fromRef = useRef('')
    const toRef = useRef('')
    const currentRef = useRef(false)
    const descriptionRef= useRef('')
    
    const addExperience = (event) => {
        event.preventDefault()
        const formData = {
            title: titleRef.current.value,
            organization: organizationRef.current.value,
            location: locationRef.current.value,
            from: fromRef.current.value,
            to: toRef.current.value,
            current: currentRef.current.value==='on' ? true : false,
            description: descriptionRef.current.value
        }
        props.addExperience(formData, props.history)
    }

    // redirect if not logged in
    if(!props.isAuthenticated) {
        return <Redirect to='/login' />
    }

    return (
        <>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead"><i className="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the past</p>
            <small>* = required field</small>
            <form className="form" onSubmit={addExperience}>
                <div className="form-group">
                <input ref={titleRef} type="text" placeholder="* Job Title" name="title" required />
                </div>
                <div className="form-group">
                <input ref={organizationRef} type="text" placeholder="* Organization" name="organization" required />
                </div>
                <div className="form-group">
                <input ref={locationRef} type="text" placeholder="Location" name="location" />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input ref={fromRef} type="date" name="from" />
                </div>
                <div className="form-group">
                <p><input ref={currentRef} type="checkbox" name="current" value="" onChange={() => setToDateDisabled(!toDateDisabled)} /> Current Job</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input ref={toRef} type="date" name="to" disabled={toDateDisabled} />
                </div>
                <div className="form-group">
                <textarea
                    ref={descriptionRef}
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    )
}

AddExperience.propTypes = {
    isAuthenticated: PropTypes.bool,
    addExperience: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = {
    showAlert: showAlert,
    addExperience: addExperience
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience))
