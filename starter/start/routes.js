'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('layouts/main')
Route.get('/database', 'CommentController.index_database')
Route.get('/comms', 'CommentController.index')
Route.get('/', 'CommentController.index')
Route.get('/delete/:id', 'CommentController.destroy');
Route.get('/upvote/:id', 'CommentController.upvote');
Route.get('/downvote/:id', 'CommentController.downvote');

Route.get('/edit/:id', 'CommentController.edit')

Route.get('/showpost/:postID', 'CommentController.frompost');
Route.post('/showpost2', 'CommentController.frompost2')
Route.post('/showpost3', 'CommentController.frompost3')
Route.post('/add', 'CommentController.store');

Route.post('/update', 'CommentController.update')

Route.get('getposts/:id', 'CommentController.get_posts')
Route.get('send-upvote/:id', 'CommentController.send_upvote')
Route.get('send-downvote/:id', 'CommentController.send_downvote')
Route.post('send-comment', 'CommentController.send_comment')
Route.post('send-edit', 'CommentController.send_update')
Route.get('send-delete/:id', 'CommentController.send_delete')

// Route.on('/database').render('database')
Route.on('/edit').render('layouts/edit');
