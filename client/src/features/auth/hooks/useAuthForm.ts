import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik";

interface UseAuthFormProps<T> {
  initialValues: T;
  validationSchema: any;
  onSubmit: (
    values: T,
    { setSubmitting, setStatus }: FormikHelpers<T>
  ) => Promise<void>;
  errorResponses: { [key: string]: string };
  onSuccess?: () => void;
}

export const useAuthForm = <T>({
  initialValues,
  validationSchema,
  onSubmit,
  errorResponses,
  onSuccess
}: UseAuthFormProps<T>) => {
  const [errorResponse, setErrorResponse] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (values: T, formikHelpers: FormikHelpers<T>) => {
    setErrorResponse("");
    try {
      await onSubmit(values, formikHelpers);
      onSuccess && onSuccess();

    } catch (error: any) {
      setErrorResponse(errorResponses[error.message] || "Ошибка");
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    errorResponse,
    navigate,
  };
};
