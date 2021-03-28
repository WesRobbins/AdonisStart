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
Route.on('/user-docs').render('user')
Route.on('/dev-docs').render('dev')
Route.get('/comms', 'CommentController.index')
Route.get('/', 'CommentController.index')
Route.get('/delete/:id', 'CommentController.destroy');
Route.get('/upvote/:id', 'CommentController.upvote');
Route.get('/downvote/:id', 'CommentController.downvote');
Route.get('/showpost/:postID', 'CommentController.frompost');
Route.post('/showpost2', 'CommentController.frompost2')
Route.post('/add', 'CommentController.store');
// Route.on('/database').render('database')
Route.on('/edit').render('layouts/edit');
