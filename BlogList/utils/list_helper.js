const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  const findBlogWithMoreLikes = (blogWithMoreLikes, actualBlog) => {
    blogWithMoreLikes = blogWithMoreLikes || actualBlog
    return blogWithMoreLikes.likes >= actualBlog.likes ? blogWithMoreLikes : actualBlog
  }

  const selectFormattedFavoriteBlog = () => {
    let blog = blogs.reduce(findBlogWithMoreLikes, {})
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    }
  }

  return blogs.length ? selectFormattedFavoriteBlog() : {}
}

const totalLikes = (blogs) => {
  const sumAllLikes = (sum, items) => {
    return sum + items.likes
  }

  return blogs.length ? blogs.reduce(sumAllLikes, 0) : 0
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
