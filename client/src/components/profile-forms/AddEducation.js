import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { addEducation } from '../../actions/profile'
import { showAlert } from '../../actions/alert'

const AddEducation = (props) => {

    const [toDateDisabled, setToDateDisabled] = useState(false)

    const institutionRef = useRef('')
    const degreeRef = useRef('')
    const fieldOfStudyRef= useRef('')
    const fromRef = useRef('')
    const toRef = useRef('')
    const currentRef = useRef(false)
    const descriptionRef= useRef('')

    const addEducation = (event) => {
        event.preventDefault()
        const formData = {
            institution: institutionRef.current.value,
            degree: degreeRef.current.value,
            fieldOfStudy: fieldOfStudyRef.current.value,
            from: fromRef.current.value,
            to: toRef.current.value,
            current: currentRef.current.value==='on' ? true : false,
            description: descriptionRef.current.value
        }
        props.addEducation(formData, props.history)
    }

    // redirect if not logged in
    if(!props.isAuthenticated) {
        return <Redirect to='/login' />
    }

    return (
        <>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead"><i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that you have attended</p>
            <small>* = required field</small>
            <form className="form" onSubmit={addEducation}>
                <div className="form-group">
                <input
                    ref={institutionRef}
                    type="text"
                    placeholder="* Institution"
                    name="institution"
                    required
                />
                </div>
                <div className="form-group">
                <input
                    ref={degreeRef}
                    type="text"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    required
                />
                </div>
                <div className="form-group">
                <input ref={fieldOfStudyRef} type="text" placeholder="Field Of Study" name="fieldOfStudy" />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input ref={fromRef} type="date" name="from" />
                </div>
                <div className="form-group">
                <p>
                    <input ref={currentRef} type="checkbox" name="current" onChange={() => setToDateDisabled(!toDateDisabled)} /> Current School or Bootcamp
                </p>
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
                    placeholder="Program Description"
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    )
}

AddEducation.propTypes = {
    isAuthenticated: PropTypes.bool,
    addEducation: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = {
    showAlert: showAlert,
    addEducation: addEducation
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation))
