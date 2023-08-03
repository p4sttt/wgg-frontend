import { useState } from 'react';

interface formStateProps {
  value: string;
  errors: string[];
}

interface initialValue {
  
}

const useForm = (initialValue: string) => {
  const [formState, setFromState] = useState<formStateProps>({
    value: initialValue,
    errors: [],
  });

  const setValue = (newValue: string) => setFromState({ ...formState, value: newValue });
  const setErrors = (error: string) =>
    setFromState({ ...formState, errors: formState.errors.push(error) });

  return {};
};
