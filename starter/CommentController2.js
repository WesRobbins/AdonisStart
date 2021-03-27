'use strict'

// Bring in model
const Post = use('App/Models/Post')

// Bring in Validator
const { validate } = use('Validator')

class PostController {
  async index({ view }){


    const posts = await Post.all()

        return view.render('posts.index', {
        title: 'Latest Posts',
        posts: posts.toJSON()

      })
  }

  async details({ params, view }){
    const post = await Post.find(params.id)

      return view.render('posts.details', {
        post: post
      })
  }

  async add({ view }){
    return view.render('posts.add')
  }

  async store({ request, response, session }) {
    const post = new Post()

    // Validator Input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3'

    })

    if (validation.fails()){
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }


    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({ notification: 'Post Added!'})

    return response.redirect('/posts')
  }

  async edit({ paras, view }){
    const post = await Post.find('params.id')

    return view.render('posts.edit', {
      post: post
    })

  }

  async update({ view }){
    return view.render('posts.add')
  }

  async store({ request, response, session }) {
    const post = new Post()

    // Validator Input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3'

    })

    if (validation.fails()){
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }


    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({ notification: 'Post Updated!'})

    return response.redirect('/posts')
  }

  async destroy({params, sessions, response}){
    <script>alert('in destroy')</script>
    const post = await Post.find(params.id)

    await post.delete()

    session.flash({ notification: 'Post Deleted!'})

    return response.redirect('/posts')
  }
}

module.exports = CommentController
