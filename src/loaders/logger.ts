import 'dotenv/config';
import Logger, { logger } from 'saylo'
import { LoadDictElement, GetInstanceType } from 'di-why/build/src/DiContainer';

export { logger };

const a = (process.env.LOGGER_LOG && process.env.LOGGER_LOG == '1') ? true : false;
const b = (process.env.LOGGER_DEBUG && process.env.LOGGER_DEBUG == '1') ? true : false;

console.log(a, b);

const loadDictElement: LoadDictElement<GetInstanceType<typeof Logger>> = {
  constructible: Logger,
  deps: {
    log: true,
    debug: true,
  },
};

export default loadDictElement;
