'use strict'

const Post = use('App/Models/Post')
// const { validate } = use('Validator')

class CommentController {

  async index({ view }) {

    const comments = await Post.all();


    return view.render(('layouts/main'), {
     posts: comments.toJSON()
   })
  }
  async index_database({ view }) {

    const comments = await Post.all();


    return view.render(('database'), {
     posts: comments.toJSON()
   })
  }

  async frompost({ view, params }) {

    const comments = await Post.all();
    const post_comments = await Post
    .query()
    .where('Post_ID', '=', params.postID)
    .fetch()

      console.log(comments.toJSON())

    return view.render(('layouts/main'), {
     title: 'Latest Comments from controller',
     posts: comments.toJSON(),
     from_post: post_comments.toJSON()
   })
 }

 async frompost2({ view, request, response, session }) {
   const sort = request.input('sort')
   var order = 'id'
   var chron = 'asc'
   var desc = 'Requested Comments with '
   if (sort == 1){
     order = 'popular'
     chron = 'desc'
     desc += 'Most Popular First'
   } else if (sort == 2) {
     order = 'popular'
     desc += 'Most Dislike First'
   } else if (sort == 3) {
     order = 'created_at'
     chron = 'desc'
     desc += 'Most Recent First'
   } else if (sort == 4) {
     order = 'created_at'
     desc += 'Oldest First'
   }

   const comments = await Post.all();
   var post_comments = await Post
   .query()
   .where('Post_ID', '=', request.input('postID'))
   .orderBy(order, chron)
   .fetch()





   return view.render(('layouts/main'), {
    title: desc,
    posts: comments.toJSON(),
    from_post: post_comments.toJSON()
  })
}

async frompost3({ view, request, response, session }) {

  const comments = await Post.all();
  var post_comments = await Post
  .query()
  .where('Post_ID', '=', request.input('postID'))
  .orderBy('parent')
  .fetch()



  var com =  post_comments.toString()

  console.log(com)


  return view.render(('layouts/main'), {
   title: 'frompost3 title',
   posts: comments.toJSON(),
   structured: post_comments.toJSON()
 })
}


  async store({ request, response, session }) {
    // Validate input
    // const validation = await validate(request.all(), {
    //   Comment: 'required|min:3|max:255',
    //   Post_ID: 'required|min:1|max:20',
    //   User_ID: 'required|min:1|max:20'
    //
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
    post.parent = 0
    post.upvotes = 0
    post.downvotes = 0
    post.popular = 0


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

  async edit({ params, view }){
    const post = await Post.find(params.id)

    return view.render('layouts/edit', {
      post: post
    })

  }

  async update({ request, response }){
    const post = await Post.find(request.input('data'))
    post.Comment = request.input('Comment')
    await post.save()
    return response.redirect('/')
  }
  async upvote({params, session, response}){
    // const postId = request.param('id')
    const post = await Post.find(params.id)

    post.upvotes +=1
    post.popular +=1
    await post.save()

    return response.redirect('/')
  }

  async downvote({params, session, response}){
    // const postId = request.param('id')
    const post = await Post.find(params.id);
    post.downvotes +=1;
    post.popular -= 1
    await post.save();

    return response.redirect('/');
  }
  async get_posts({ params }) {
    // const sort = request.input('sort')
    // var order = 'id'
    // var chron = 'asc'
    // var desc = 'Requested Comments with '
    // if (sort == 1){
    //   order = 'popular'
    //   chron = 'desc'
    //   desc += 'Most Popular First'
    // } else if (sort == 2) {
    //   order = 'popular'
    //   desc += 'Most Dislike First'
    // } else if (sort == 3) {
    //   order = 'created_at'
    //   chron = 'desc'
    //   desc += 'Most Recent First'
    // } else if (sort == 4) {
    //   order = 'created_at'
    //   desc += 'Oldest First'
    // }

    var post_comments = await Post
    .query()
    .where('Post_ID', '=', params.id)
    // .orderBy(order, chron)
    .fetch()

    return post_comments.toJSON()
 }

 async send_upvote({ params }) {
   const post = await Post.find(params.id)

   post.upvotes +=1
   post.popular +=1
   await post.save()

   return 'Upvote succeeded for comment id ' +params.id + '. Comment now has ' + post.popular + ' votes'
 }

 async send_downvote({ params }) {
   const post = await Post.find(params.id)

   post.downvotes +=1
   post.popular -=1
   await post.save()

   return 'Downvote succeeded for comment id ' +params.id + '. Comment now has ' + post.popular + ' votes'
 }

 async send_comment({ request, response }) {
   // Validate input
   // const validation = await validate(request.all(), {
   //   Comment: 'required|min:3|max:255',
   //   Post_ID: 'required|min:1|max:20',
   //   User_ID: 'required|min:1|max:20'
   //
   // })
   //
   // if(validation.fails()){
   //   session.withErrors(validation.messages()).flashAll()
   //   return response.redirect('back')
   // }
   console.log('in send_comment')
   const post = new Post()

   post.User_ID = request.input('User_ID')
   post.Post_ID = request.input('Post_ID')
   post.Comment = request.input('Comment')
   post.parent = 0
   post.upvotes = 0
   post.downvotes = 0
   post.popular = 0


   await post.save()


   return 'Comment Successfully Added'
 }

 async send_update({ request, response }){
   const post = await Post.find(request.input('data'))
   post.Comment = request.input('Comment')
   await post.save()
   return 'Comment Edited Successfully'
 }

 async send_delete({ params }){
   // const postId = request.param('id')
   const post = await Post.find(params.id)


   if (post) {
     await post.delete()
     return '1: Comment Delted Succesfully'
   } else {
     return '0: The Comment you are trying to delete does not exist'
   }
 }
}




module.exports = CommentController
