import React from 'react'
import { connect } from 'react-redux'
import { fetchPostsAsync as fetchPosts } from '../../redux/actionCreators'

class PostsList extends React.Component {
  render() {
    return (
      <div>
        <h3>PostsList</h3>
        {this.props.isLoading ? (
          'Loading...'
        ) : (
          <ul>
            {this.props.posts.length
              ? this.props.posts.map(post => <li>{JSON.stringify(post)}</li>)
              : 'empty list'}
          </ul>
        )}
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchPosts()
  }
}

const mapStateToProps = ({ post: { isLoading, posts } }) => ({
  isLoading,
  posts,
})

const mapDispatchToProps = dispatch => {
  return { fetchPosts: () => dispatch(fetchPosts()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
