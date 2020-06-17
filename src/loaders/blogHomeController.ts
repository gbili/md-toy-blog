import BlogHomeController from '../controllers/BlogHomeController';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<BlogHomeController> = {
  constructible: BlogHomeController,
  locateDeps: {
    appPaths: 'appPathResolverService',
    postPreviewShortener: 'postPreviewShortener',
    markdownToHtmlService: 'markdownToHtmlService',
    templateHydratorService: 'templateHydratorService',
    additionalViewData: 'additionalViewData',
  }
};

export default loadDictElement;