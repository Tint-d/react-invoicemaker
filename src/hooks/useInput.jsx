import { useCallback, useEffect, useState } from "react";

const useInput = (initialValue, onSubmit) => {
  //   const [values, setValues] = useState(initialValue);
  const [formState, setFormState] = useState(initialValue);
  const handleChange = useCallback((e) => {
    const { value, name } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, [formState]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(formState);
      console.log(formState)
    },
    [formState, onSubmit]
  );
  return [formState, handleChange, handleSubmit];
};

export default useInput;
