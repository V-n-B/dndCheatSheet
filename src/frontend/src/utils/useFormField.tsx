import Joi from '@hapi/joi';
import { useEffect, useState } from 'react';
import { updateValidationErrorsForOne, ValidationErrors } from './validation';

export function useFormField<T>(
    name: string,
    initialValue: T,
    schema: Joi.Schema,
    onChangeValidation: boolean,
    errors: ValidationErrors,
    setErrors: (errors: ValidationErrors) => void
) {
    const [formField, setFormField] = useState(initialValue);

    useEffect(() => {
        if (onChangeValidation) {
            handleValidation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formField, onChangeValidation]);

    return [formField, setFormField] as const;

    function handleValidation() {
        const errors2 = updateValidationErrorsForOne(schema, name, formField, errors);
        console.log('errors: ', errors2);
        setErrors(updateValidationErrorsForOne(schema, name, formField, errors));
    }
}
