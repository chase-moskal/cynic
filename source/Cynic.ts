
import tests from './tests';
import Chain, {ChainMode, createTestingChainClass} from './Chain';

var Cynic = createTestingChainClass(tests, Chain);
export default Cynic;

export {default as tests} from './tests';
export {default as Chain, ChainMode, createTestingChainClass, inverter} from './Chain';
