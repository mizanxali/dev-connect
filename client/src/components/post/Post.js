import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getPostById } from '../../actions/post'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { Link, useRouteMatch, Redirect } from 'react-router-dom'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = props => {

    const match = useRouteMatch()

    useEffect(() => {
        props.getPostById(match.params.id)
    }, [])

    //redirect if not logged in
    if(!props.isAuthenticated) {
        return <Redirect to='/login' />
    }
    
    return (
        !props.post.loading && props.post.post!==null ?
        <>
            <Link to="/posts" className="btn">Back To Posts</Link>

            <PostItem post={props.post.post} showActions={false} />
            <CommentForm postId={props.post.post._id} />

            <div className="comments">
                {props.post.post.comments.map(comment => {
                    return <CommentItem key={comment._id} comment={comment} postId={props.post.post._id} />
                })}
            </div>
        </> : <Spinner />
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    getPostById: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        post: state.post,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = {
    getPostById: getPostById
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
