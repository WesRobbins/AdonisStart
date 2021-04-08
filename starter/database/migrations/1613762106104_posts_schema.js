'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      // table.string("Username")
      table.string("Comment")
      table.string("User_ID")
      table.string("Post_ID")
      table.integer("upvotes")
      table.integer("downvotes")
      table.integer("popular")
      table.integer("parent")
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
