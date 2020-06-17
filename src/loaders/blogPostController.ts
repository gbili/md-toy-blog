import BlogPostController from '../controllers/BlogPostController';
import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<GetInstanceType<typeof BlogPostController>> = {
  constructible: BlogPostController,
  locateDeps: {
    appPaths: 'appPathResolverService',
    markdownToHtmlService: 'markdownToHtmlService',
    templateHydratorService: 'templateHydratorService',
  }
};

export default loadDictElement;