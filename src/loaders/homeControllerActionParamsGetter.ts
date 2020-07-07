import { LoadDictElement } from 'di-why/build/src/DiContainer';

type HomeControllerActionParamGetter = () => { posts: string[]; };

const loadDictElement: LoadDictElement<HomeControllerActionParamGetter> = {
  factory: ({ validPublicPostSlugList }: { validPublicPostSlugList: string[] }) => {
    return () => ({ posts: validPublicPostSlugList });
  },
  locateDeps: {
    validPublicPostSlugList: 'validPublicPostSlugList',
  }
};

export default loadDictElement;
