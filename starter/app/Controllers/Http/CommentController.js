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
  async store({ request, response, session }) {
    // Validate input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3'
    })

    if(validation.fails()){
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = new Post()

    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({ notification: 'Post Added!' })

    return response.redirect('/database')
  }
}

module.exports = CommentController
