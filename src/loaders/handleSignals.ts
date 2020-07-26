import { LoadDictElement } from 'di-why/build/src/DiContainer';
import handleSignals from 'server-handle-signals';

const loadDictElement: LoadDictElement<typeof handleSignals> = {
  instance: handleSignals,
};

export default loadDictElement;