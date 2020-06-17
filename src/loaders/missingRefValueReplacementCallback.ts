import { LoadDictElement } from 'di-why/build/src/DiContainer';

type MissingRefValueReplacementCallback = (ref: string) => string;
const loadDictElement: LoadDictElement<MissingRefValueReplacementCallback> = {
  factory: function ({ replaceWith }) {
    return (ref: string): string => {
      console.log(`Warning - Missing ref: ${ref}` );
      return `${replaceWith}`;
    };
  },
  locateDeps: {
    replaceWith: 'MTB_MISSING_REF_VALUE_REPLACEMENT',
  }
};

export default loadDictElement;
