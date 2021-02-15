import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import { Redirect } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = props => {

    useEffect(() => {
        props.getPosts()
    }, [])

    //redirect if not logged in
    if(!props.isAuthenticated) {
        return <Redirect to='/login' />
    }

    return (
        props.post.loading ? <Spinner /> : <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

            <PostForm />

            <div className="posts">
                {props.post.posts.map((post) => {
                    return <PostItem key={post._id} post={post} />
                })}
            </div>
        </>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        post: state.post,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = {
    getPosts: getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
