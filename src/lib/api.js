import axios from './../axios'
const getArticles = (params) => axios({
    url: '/articles',
    method: 'get',
    params
})
const getArchives = (params) => axios({
    url: '/archives',
    method: 'get',
    params
})
const getArticleById = (id) => axios({
    url: `/articles/${id}`,
    method: 'get'
})
const subComment = ({
    data
}) => axios({
    url: '/comments',
    method: 'post',
    data
})
const getBoardComments = (params) => axios({
    url: `board/comments`,
    method: 'get',
    params
})
const getArticlesByTag = (tag, params) => axios({
    url: `/tags/${tag}/articles`,
    method: 'get',
    params
})
const getTags = (params) => axios({
    url: '/tags',
    params
})
const api = {
    article: '/article',
    tag: '/tag',
    archive: '/archive',
    person: '/admin',
    comment: '/comment',
    user: '/user'
}
export {
    getArticles,
    getArchives,
    getArticleById,
    subComment,
    getBoardComments,
    getArticlesByTag,
    getTags
}
export default api;