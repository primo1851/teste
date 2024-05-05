import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isPasswordValid",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          const isValid = passwordRegex.test(value);
          if (!isValid) {
            console.log(
              "Senha deve conter uma letra mauiscula e uma minuscula um digito e ter no minimo 8 caracteres"
            );
          }
          console.log("senha forte");
          return isValid;
        },
      },
    });
  };
}
