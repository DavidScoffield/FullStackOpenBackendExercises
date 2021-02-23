const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumAllLikes = (sum, items) => {
    return sum + items.likes
  }

  return blogs.reduce(sumAllLikes, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
