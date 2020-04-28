# WordpressPosts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

# Project Structure

```
├── app
    ├── components              -> folder, where we places all of components
    │   ├── blog                -> blog site
    │   ├── main-page           -> main page of app
    │   ├── post                -> single post site
    ├── shared                  -> folder, where we places all of shared, routing, services, guards etc.
    │   ├── routing             -> folder with all app-routing.module
    │   ├── services            -> folder with all of services
```

# App Routing

application contains 3 components:

- main-page component (MainPageComponent) - path: ''
- blog component (BlogComponent) - path: 'blog'
- post component (PostComponent) - in this routing we use 'post/ID_OF_POST'

# App Services

Project has one service (PostsService), that we use to get single post, get posts and get posts comments from wordpress api.


| Function | Resource |
| ------ | ------ |
| getPosts | `https://public-api.wordpress.com/rest/v1/sites/en.blog.wordpress.com/posts/${data}` |
| getSinglePost | `https://public-api.wordpress.com/rest/v1/sites/en.blog.wordpress.com/posts/${postID}` |
| getPostComments | `https://public-api.wordpress.com/rest/v1/sites/en.blog.wordpress.com/posts/${postID}/replies/` |


# Live Demo

See [WordpressPosts app](https://mr-creations.pl/dev/Akquinet-rekrutacja/)
