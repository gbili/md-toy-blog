
import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';
import Mostachito from 'mostachito';

const loadDictElement: LoadDictElement<GetInstanceType<typeof Mostachito>> = {
  constructible: Mostachito,
  locateDeps: {
    missingRefValueReplacement: 'MTB_MISSING_REF_VALUE_REPLACEMENT',
  }
};

export default loadDictElement;
