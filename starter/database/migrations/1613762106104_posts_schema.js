'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string("Username")
      table.string("Comment")
      table.integer("User_ID")
      table.integer("Post_ID")
      table.timestamps()

    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
