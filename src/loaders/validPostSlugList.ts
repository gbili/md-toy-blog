import { LoadDictElement } from 'di-why/build/src/DiContainer';
type PostSlugList = string[];
const loadDictElement: LoadDictElement<PostSlugList> = {
  factory: ({ validPostSlugListGetter }: { validPostSlugListGetter: () => PostSlugList }) => {
    return validPostSlugListGetter();
  },
  locateDeps: {
    validPostSlugListGetter: 'validPostSlugListGetter',
  },
};

export default loadDictElement;