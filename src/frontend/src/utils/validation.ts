// import { ISchemaContainer } from './ISchemaContainer';
import Joi from '@hapi/joi';
import { Map } from 'immutable';

export type ValidationErrors = Map<string, string | undefined>;

export const emptyValidationErrors: ValidationErrors = Map();

type ValidationResult = IValidationInvalidResult | IValidationValidResult;

interface IValidationInvalidResult {
    hasErrors: true;
    errors: ValidationErrors;
}

interface IValidationValidResult {
    hasErrors: false;
    errors: ValidationErrors;
}

export function validate(schema: Joi.Schema, object: any): ValidationResult {
    const result = schema.validate(object, { abortEarly: false, stripUnknown: { arrays: false, objects: true } });
    if (result.error) {
        const map: { [key: string]: string } = {};
        for (const detail of result.error.details) {
            map[detail.path.join('.')] = detail.type.replace('.', '_');
        }
        return { hasErrors: true, errors: Map(map) };
    } else {
        return { hasErrors: false, errors: emptyValidationErrors };
    }
}

export function updateValidationErrorsForOne(schema: Joi.Schema, name: string, value: any, errors: ValidationErrors) {
    const { errors: newErrors } = validate(schema, { [name]: value });
    if (newErrors.has(name)) {
        return errors.set(name, newErrors.get(name));
    }
    return errors.remove(name);
}
