import { useState } from 'react';

type Fields<Values> = {
  [key in keyof Values]: string | number;
};

interface useFormParams<Values> {
  initialValues: Values;
  onSubmit?: () => void;
  validate?: () => boolean;
}

const generateErrors = <Values>(values: Values) =>
  Object.keys(values as Fields<Values>).reduce(
    (clone, key) => Object.assign(clone, { [key]: null }),
    {} as Record<keyof Values, string | null>,
  );

export const useForm = <Values>({
  initialValues,
  onSubmit = () => {},
  validate = () => true,
}: useFormParams<Values>) => {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState(() => generateErrors(initialValues));

  const setFieldValue = <Field extends keyof Values>(field: Field, value: Values[Field]) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const setFieldError = <Field extends keyof Values>(field: Field, error: string) => {
    setErrors((errors) => ({
      ...errors,
      [field]: error,
    }));
  };

  const handleSubmit = () => {
    setErrors(() => generateErrors(initialValues));

    const isValid = validate();

    if (isValid) {
      onSubmit();
    }
  };

  return { values, setFieldValue, errors, setFieldError, handleSubmit };
};
