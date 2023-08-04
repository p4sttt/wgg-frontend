import { useState } from 'react';

type Fields<Values> = {
  [key in keyof Values]: string | number;
};

const generateErrors = <Values>(values: Values) =>
  Object.keys(values as Fields<Values>).reduce(
    (clone, key) => Object.assign(clone, { [key]: null }),
    {} as Record<keyof Values, string | null>,
  );

export const useForm = <Values>(initialValues: Values) => {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState(() => generateErrors(initialValues));

  const setFieldValue = <Field extends keyof Values>(field: Field, value: Values[Field]) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const setFieldError = <Field extends keyof Values>(field: Field, error: string) => {
    setErrors({
      ...errors,
      [field]: error,
    });
  };

  return { values, setFieldValue, errors, setFieldError };
};
