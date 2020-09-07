import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';

configure({ adapter: new ReactSixteenAdapter() });
export { shallow, mount, render };
export default Enzyme;
