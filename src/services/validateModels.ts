import {validate} from "class-validator";
import {BadRequestException, UnprocessableEntityException} from "@nestjs/common";


/**
 * Validation of fields if they corresponds to model.
 *
 * @param model
 *
 * @return {Promise<Author|Book>}
 *
 * @throws {BadRequestException|UnprocessableEntityException}
 */
export const validateModel = async (model) => {
    const errors = await validate(model);

    const missingFieldsErrors = errors.map(e => e.constraints.presence).filter(e => e !== undefined);

    if (missingFieldsErrors.length > 0) {
        throw new BadRequestException(missingFieldsErrors.join(', '));
    }

    if (errors.length > 0) {
        throw new UnprocessableEntityException(errors.map(e => Object.values(e.constraints).join(', ')).join('; '));
    }

    return model;
};
