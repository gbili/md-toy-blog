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

**IMPORTANT**: your files have to live in 3 folders (you an change their names using _environment variables_, see the section environment variables):

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
node ./node_modules/md-toy-blog/build/src/compile.js
# run the app
node ./node_modules/md-toy-blog/build/src/index.js
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

If you want to use `md-toy-blog` npm module. You might as well use a `package.json` in your project's root dir with a few scripts that will help you update your blog whenever you write a new markdown blog post. Here is what the `package.json` could look like :

```json
{
  "name": "md-toy-blog-skeleton",
  "version": "0.0.0-development",
  "description": "This is the skeleton for your md-toy-blog. Git clone this and run `npm buid && npm serve`",
  "scripts": {
    "serve": "node ./node_modules/md-toy-blog/build/src/index.js",
    "build": "node ./node_modules/md-toy-blog/build/src/compile.js"
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

**IMPORTANT**: you can also clone a repo with the skeleton structure to then start adding markdown blog posts in its `content` dir. `cd` to your workspace and clone it with:

```bash
git clone https://github.com/md-toy-blog-skeleton.git
npm i
npm run build
npm run serve
```

After these commands your blog should be available in your browser at [http://localhost:3100](http://localhost:3100) of course you will need to place some of your own markdown posts in the `content`'s directory, and remove the sample ones.
