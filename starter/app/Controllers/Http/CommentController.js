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
  async index2({ view }) {

    const comments = await Post.all();


    return view.render(('layouts/main'), {
     posts: comments.toJSON()
   })
  }
  async store({ request, response, session }) {
    // Validate input
    // const validation = await validate(request.all(), {
    //   title: 'required|min:3|max:255',
    //   body: 'required|min:3'
    // })
    //
    // if(validation.fails()){
    //   session.withErrors(validation.messages()).flashAll()
    //   return response.redirect('back')
    // }

    const post = new Post()

    post.User_ID = request.input('User_ID')
    post.Post_ID = request.input('Post_ID')
    post.Comment = request.input('Comment')
    post.upvotes = 0
    post.downvotes = 0

    await post.save()

    session.flash({ notification: 'Post Added!' })

    return response.redirect('/comms')
  }

  async destroy({params, session, response}){
    // const postId = request.param('id')
    const post = await Post.find(params.id)

    await post.delete()

    session.flash({ notification: 'Post Deleted!'})

    return response.redirect('/')
  }
  async upvote({params, session, response}){
    // const postId = request.param('id')
    const post = await Post.find(params.id)

    post.upvotes +=1
    await post.save()

    return response.redirect('/')
  }

  async downvote({params, session, response}){
    // const postId = request.param('id')
    const post = await Post.find(params.id);
    post.downvotes +=1;

    await post.save();

    return response.redirect('/');
  }
}

module.exports = CommentController
