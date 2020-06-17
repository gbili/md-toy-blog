import { LoadDictElement } from 'di-why/build/src/DiContainer';
import { PostListGetter } from './validPostSlugListGetter';

type HomeControllerActionParamGetter = () => { posts: string[]; };

const loadDictElement: LoadDictElement<HomeControllerActionParamGetter> = {
  factory: ({ validPostSlugListGetter }: { validPostSlugListGetter: PostListGetter }) => {
    return () => ({ posts: validPostSlugListGetter() });
  },
  locateDeps: {
    validPostSlugListGetter: 'validPostSlugListGetter',
  }
};

export default loadDictElement;
