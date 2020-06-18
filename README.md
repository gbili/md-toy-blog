# Markdown Toy Blog

- Serves markdown files as an html blog.
- Uses markdown filenames as url-post-slugs.
- Takes information from the non standard markdown header:

  ```md
  ---
  title: My post title
  myVariable: this will be passed to the corresponding html template
  ---

  My blog post content goes here.

  ```

- You can add your own HTML templates, js and css styling.

**IMPORTANT**: your files have to live in 3 folders (you an change their names using `envvars`):

1. `./content`: markdown blog posts live here
2. `./views`: html view templates containing mostachito references like `{{ myVariable }}`
3. `./static`: can have subdirectories `./static/css`, `./static/js` etc.

## Installation

There are two ways of using this package either:

1. as a **node_module**: `npm i md-toy-blog`
2. by cloning the **repo** `git clone https://github.com/gbili/md-toy-blog-.git`

## 1. Installation as a `node_module`

Let's say the root directory of your blog is `<my_blog>`, then your blog posts will have to be in a subdirectory called `content`:

```text
 <my_blog>/
  |_ content/
    |_ my-first-post.md
    |_ my-second-post.md
    |_ unshakable-truths-about-life.md
    |_ etc.md

```

**IMPORTANT**: it is a requirement that **your markdown posts be contained in a sub directory called `content`** (unless you change the envvar `MTB_MD_BLOG_POSTS_DIR`)

Now that we have a structure like this `./<my_blog>/content`, go to the `<my_blog>` directory and install this package:

```bash
cd <my_blog>
npm i md-toy-blog
```

Once everything is installed, it should work out of the box with.

```bash
# generates the json files list list
node ./node_modules/md-toy-blog/build/compile.js
# run the app
node ./node_modules/md-toy-blog/build/index.js
```

## 2. Installation as a `repo`

```bash
git clone https://github.com/gbili/md-toy-blog.git
npm i
```

You can now place your blog posts in `content` dir, your views in `views` and your static files in `static`.

Now run the blog:

```bash
npm run build
npm run serve
```

## TODO

Create a separate github repository with a `package.json` containing:

```json
{
  "name": "md-toy-blog-skeleton",
  "version": "0.0.0-development",
  "description": "This is the nest for your md-toy-blog. Git clone this and run `npm buid && npm serve`",
  "scripts": {
    "serve": "node ./node_modules/md-toy-blog/build/index.js",
    "build": "node ./node_modules/md-toy-blog/build/compile.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/gbili/md-toy-blog-skeleton.git"
  },
  "keywords": [
    "nodejs",
    "templating",
    "moustache",
    "simple",
    "minimal"
  ],
  "author": "Guillermo Pages <mail@guillermo.at> (https://guillermo.at)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/gbili/md-toy-blog-skeleton/issues"
  },
  "homepage": "https://github.com/gbili/md-toy-blog-skeleton#readme",
  "dependencies": {
    "md-toy-blog": "latest",
  },
}
```
