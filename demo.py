# python library that allows requests
import requests

# link to url-lib docs:
#   https://docs.python-requests.org/en/master/

# base url
base = 'http://esof423.cs.montana.edu:4013'

# helper functions

def format_json(response):
    num = 1
    for i in response:
        print(f'Comment {num}\n--------------')
        print(f'User: {i["User_ID"]}')
        print(f'\"{i["Comment"]}\"')
        print(f'Votes: {i["popular"]}\n\n')
        num+=1
        
# get all comments from post 23
print('+++++++++++++++++++++++++++')
print('Get Comments from Database')
print('+++++++++++++++++++++++++++')
while (True):
    post_id = input("Enter Post Id: ")
    if (post_id == 'exit'): break

    # following two lines 
    url = base+'/getposts/'+post_id
    comments = requests.get(url)
    print(f'\n{len(comments.json())} comments on this post.\n')
    format_json(comments.json())

# upvote a comment
print('\n\n\n+++++++++++++++++++++++++++')
print('Upvote a Comment in Database')
print('+++++++++++++++++++++++++++')
while(True):
    comm_id = input("Enter Comment Id: ")
    if (comm_id == 'exit'): break
    url = base+'/send-upvote/'+comm_id
    response = requests.get(url)
    print(response.text)


# downvote a comment
print('\n\n\n+++++++++++++++++++++++++++')
print('Downvote a Comment in Database')
print('+++++++++++++++++++++++++++')
while(True):
    comm_id = input("Enter Comment Id: ")
    if (comm_id == 'exit'): break
    url = base+'/send-downvote/'+comm_id
    response = requests.get(url)
    print(response.text)
    


# post a new comment
print('\n\n\n+++++++++++++++++++++++++++')
print('Add a new Comment in the Database')
print('+++++++++++++++++++++++++++')
while(True):
    user_id = input("Enter User Id: ")
    if (user_id == 'exit'): break
    comm = input("Enter Comment: ")
    request_body = {"User_ID":user_id, "Comment": comm, "Post_ID":101}
    url = base+'/send-comment'
    response = requests.post(url, data=request_body)
    print(response.text)

# delete a comment
print('\n\n\n+++++++++++++++++++++++++++')
print('Delete a Comment in the Database')
print('+++++++++++++++++++++++++++')
while(True):
    comm_id = input("Enter Comment Id: ")
    if (comm_id == 'exit'): break
    url = base+'/send-delete/'+comm_id
    response = requests.get(url)
    print(response.text)
    
    
# edit a comment
