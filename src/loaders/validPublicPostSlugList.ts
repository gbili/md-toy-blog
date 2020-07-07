import { LoadDictElement } from 'di-why/build/src/DiContainer';
import asyncFilter from '../utils/asyncFilter';

type PostSlugList = string[];
type FactoryProps = {
  validPostSlugListGetter: () => PostSlugList;
  markdownToHtmlService: MarkdownToHtmlServiceInterface;
  appPaths: AppPathsInterface;
};

const loadDictElement: LoadDictElement<Promise<PostSlugList>> = {
  factory: async ({ validPostSlugListGetter, markdownToHtmlService, appPaths }: FactoryProps) => {
    const privateAndPublicPostSlugList = validPostSlugListGetter();
    const extractPostData = async (postSlug: string) => {
      try {
        const postData = await markdownToHtmlService.extractFmAttributesAndHtmlBodyFromMd(postSlug, appPaths.getMarkdownFilePath(postSlug));
        return postData;
      } catch (err) {
        console.log(err.message);
        throw err;
      }
    }
    const isPublic = async (postSlug: string) => (await extractPostData(postSlug)).attributes.privacy === "public";
    const onlyPublicPostSlugList = await asyncFilter(privateAndPublicPostSlugList, isPublic)
    return onlyPublicPostSlugList;
  },
  locateDeps: {
    appPaths: 'appPathResolverService',
    validPostSlugListGetter: 'validPostSlugListGetter',
    markdownToHtmlService: 'markdownToHtmlService'
  },
};

export default loadDictElement;