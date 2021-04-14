import { useContext } from 'react';
import { ErrorContext } from './errorProvider';

function useError() {
  const { addError } = useContext(ErrorContext);
  return { addError };
}

export default useError;
