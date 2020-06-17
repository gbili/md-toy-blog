import NotFoundController from '../controllers/NotFoundController';
import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';

const loadDictElement: LoadDictElement<GetInstanceType<typeof NotFoundController>> = {
  constructible: NotFoundController,
};

export default loadDictElement;