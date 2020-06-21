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
  
  ...

  ```

- You can add your own HTML templates, js and css styling.

**IMPORTANT**: your files have to live in 3 folders (you can change their names using _environment variables_, see the section environment variables):

1. `./content`: markdown blog posts live here
2. `./views`: html view templates containing mostachito references like `{{ myVariable }}`
3. `./static`: can have subdirectories `./static/css`, `./static/js`, `./static/img` etc.

## Installation

There are two ways of using this package either:

1. as a **node_module**: `npm i md-toy-blog`
2. by cloning the **repo** `git clone https://github.com/gbili/md-toy-blog.git`

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
node ./node_modules/md-toy-blog/build/src/compile.js
# run the app
node ./node_modules/md-toy-blog/build/src/index.js
```

**IMPORTANT**: look up the section _Skeleton blog project_ to get a skeleton directory structure and a `package.json` with the two commands above as scripts, so you can quickly run `npm run build && npm run serve` instead.

## 2. Installation as a `repo`

```bash
git clone https://github.com/gbili/md-toy-blog.git
cd md-toy-blog
npm i
```

You can now place your blog posts in `content` dir, your views in `views` and your static files in `static`.

Now run the blog:

```bash
npm run build
npm run serve
```

## Environment variables

There are a few environment variables that allow you to customize _Md toy blog_'s behaviour, they are the following:

- `PORT`
  - default: `3100`
  - the port under which your blog will be available (e.g. `http://localhost:3100`)
- `MTB_COMPILED_USER_CONTENT_DIR`
  - default: `<MTB_USER_PROJECT_ROOT_DIR>/compiled_user_content`
  - the absolute path of where the list of files that are to be served will be stored
- `MTB_ENV`
  - `clone` | `module`
  - if you cloned the repo from github it will be `clone`, if you installed the module via `npm i <MTB_PACKAGE_NAME>` it will be `module`
- `MTB_MD_BLOG_POSTS_DIR`
  - default: `<MTB_USER_PROJECT_ROOT_DIR>/content`
  - absolute path of where you store your blog posts, must be readable by node
- `MTB_MISSING_REF_VALUE_REPLACEMENT`
  - default: `<strong style="color: red;">THIS_IS_A_DUMMY_VAL_FOR_A_MISSING_REF</strong>`
  - Whenever a _view template_ references a key that is missing in the _data_ passed to mostachito, it will be replaced by `<MTB_MISSING_REF_VALUE_REPLACEMENT>`
- `MTB_PACKAGE_NAME`
  - default: `md-toy-blog`
  - if you decide to change this package's name
- `MTB_POST_PREVIEW_LENGTH`
  - default: `70`
  - controls the max length of the post previews in Home page's post list
- `MTB_ROOT_DIR`
  - the absolute path to this project's directory. Differs depending on `<MTB_ENV>`
- `MTB_STATIC_FILES_DIR`
  - default: `<MTB_USER_PROJECT_ROOT_DIR>/static` if you have created that dir, or `<MTB_PROJECT_ROOT_DIR>/static` otherwise.
  - where you store your static files, uses the default ones if define none.
- `MTB_USER_CUSTOM_CONFIG_PATH`:
  - default: `<MTB_USER_PROJECT_ROOT_DIR>/<MTB_PROJECT_NAME>.config.js`
  - where you can define custom keys or override keys in `appConfig`
- `MTB_USER_PROJECT_ROOT_DIR`:
  - the directory in which you normally would have your `.git` directory. where you normally would have your `content`, `static`, `views` and `user_compiled_dir`
- `MTB_VIEW_TEMPLATES_DIR`
  - default: `<MTB_USER_PROJECT_ROOT_DIR>/views` if you have created that dir, or `<MTB_PROJECT_ROOT_DIR>/views` otherwise.
  - where your `.html` templates should be placed. They should be named after the `controller/action` that handles their data (e.g. `blogPostController.ts` should have an html template named `blog-post.html`).

## Skeleton Blog Project

When you want to use `md-toy-blog` as an **npm module** it is more practical to have a `package.json` with a few scripts to help you with updating your blog whenever you write new posts.

> If you want to fast forward clone the [skeleton blog project](https://github.com/gbili/md-toy-blog-skeleton) and follow the `README` there, basically it tells you to:

```bash
git clone https://github.com/md-toy-blog-skeleton.git
cd md-toy-blog-skeleton
```

The command above will get you a directory structure with a `package.json` that looks like this :

```json
{
  "name": "md-toy-blog-skeleton",
  "version": "0.0.0-development",
  "description": "This is the skeleton for your md-toy-blog. Git clone this and run `npm buid && npm serve`",
  "scripts": {
    "serve": "node ./node_modules/md-toy-blog/build/src/index.js",
    "build": "node ./node_modules/md-toy-blog/build/src/compile.js",
    "restart": "npm run build && npm run serve"
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
    "blog",
    "markdown",
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

Once you have such a `package.json` file you can proceed with the installation.

```bash
npm i
npm run restart
```

After these commands your blog should be available in your browser at [http://localhost:3100](http://localhost:3100) of course you will need to place some of your own markdown posts in the `content`'s directory, and remove the sample ones.

**IMPORTANT**: **DO NOT FORGET TO `npm run restart`** after you create a new blog post.
