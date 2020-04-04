import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';

@ValidatorConstraint({name: 'presence', async: false})
export class Presence implements ValidatorConstraintInterface {

    validate(text: string, args: ValidationArguments) {
        return !(text === null || text === undefined);
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return 'Missing value';
    }
}
