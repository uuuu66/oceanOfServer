import { ClassConstructor } from 'class-transformer';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsNotEmptyWhenFieldExist' })
export class IsNotEmptyWhenFieldExistConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const [fn] = args.constraints;
    console.log(value, args);
    if (!fn(args.object)) return true;
    else return !!value;
  }

  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: (() => any)[] = args.constraints;
    return `${constraintProperty}is not existed`;
  }
}
export const IsNotEmptyWhenFieldExist = <T>(
  type: ClassConstructor<T>,
  property: (o: T) => any,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    console.log(object, propertyName, 'ss');
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsNotEmptyWhenFieldExistConstraint,
    });
  };
};
