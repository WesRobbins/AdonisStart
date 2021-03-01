'use strict'

const Post = use('App/Models/Post')

class CommentController {
  async index({ view }) {

    const comments = await Post.all();


    return view.render(('/database'), {
     title: 'Latest Comments from controller',
     posts: comments.toJSON()
   })
  }
}

module.exports = CommentController
