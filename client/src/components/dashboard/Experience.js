import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import formatDate from '../../utils/formatDate'
import { deleteExperience } from '../../actions/profile'

const Experience = props => {
    const experiences = props.experiences.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.organization}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>
                {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
            </td>
            <td>
                <button onClick={() => props.deleteExperience(exp._id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ))
    return (
        <>
            <h2 className='my-2'>Experience Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </>
    )
}

Experience.propTypes = {
    experiences: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    deleteExperience: deleteExperience
}

export default connect(null, mapDispatchToProps)(Experience)
