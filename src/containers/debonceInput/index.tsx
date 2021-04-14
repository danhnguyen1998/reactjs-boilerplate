import { Input } from 'antd';
import reactComponentDebounce from 'react-component-debounce';

const DebounceInput = reactComponentDebounce({
  valuePropName: 'value',
  triggerMs: 250,
})(Input);
export default DebounceInput;
