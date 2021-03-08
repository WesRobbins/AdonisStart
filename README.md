Adonis Start

The commenting function is modeled after the Reddit commenting Functions
 allowing for infinite nesting of comments built with the Adonis framework. Below is a
 list of the files developed/edited specifically for this project and what make it unique.
 Remaining files can be assumed to be unedited, and apart of the Adonis framework.

Files and their functions:

../app/Controllers/CommentController.js:
       The comment controller file contains all of the
       the implementation of the functions required within the API

../database/1613762106104_posts_schema.js:
      Contains the structure of the DB with each of the required fields for the user to successfully posts a comment. In order to update the DB, developers need to run the command, adonis migration:run, in order to add or remove a field.

../resources/views/layouts/add.edge:
      Contains the form for user input when posting a new comment.

../layouts/edit.edge:
      Clone of the add file in order to allow users to update/edit their comments.

../layouts/main.edge:
       Navigation for site

../views/database.edge:
      Forms for user input in order to gather necessary information to make a post.

../views/dev.edge:
      Developer documentation page.

../views/user.edge:
      User documentation page.

../views/welcome.edge:
      Demo sites landing page.
