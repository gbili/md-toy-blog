import { LoadDictElement } from 'di-why/build/src/DiContainer';
import getPostPreviewShortener from '../utils/getPostPreviewShortener';

const loadDictElement: LoadDictElement = {
  factory: getPostPreviewShortener,
  locateDeps: { 
    previewLength: 'MTB_POST_PREVIEW_LENGTH',
  },
};

export default loadDictElement;