import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = props => {

    const textRef = useRef('')

    const createPost = (e) => {
        e.preventDefault()

        const formData = {
            text: textRef.current.value
        }

        props.addPost(formData)
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Say Something...</h3>
            </div>
            <form onSubmit={createPost} className="form my-1">
                <textarea
                    ref={textRef}
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    addPost: addPost
}

export default connect(null, mapDispatchToProps)(PostForm)