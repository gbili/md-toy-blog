import { LoadDictElement } from 'di-why/build/src/DiContainer';

function isString(slug: string | undefined): slug is string {
  return typeof slug !== 'undefined';
}

export type PostSlugList = string[];
export type PostListGetter = () => PostSlugList;

const loadDictElement: LoadDictElement<PostListGetter> = {
  factory: ({ compiledUserContentDir }: { compiledUserContentDir: string }) => {
    return function (): string[] {
      const postList: string[] = require(`${compiledUserContentDir}/post-list`);
      const postSlugsList = postList.map(fileName => fileName.split('.').shift()).filter(isString);
      return postSlugsList;
    };
  },
  locateDeps: {
    compiledUserContentDir: 'MTB_COMPILED_USER_CONTENT_DIR',
  },
};

export default loadDictElement;