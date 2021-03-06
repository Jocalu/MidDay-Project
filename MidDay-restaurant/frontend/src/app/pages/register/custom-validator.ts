import { FormGroup } from '@angular/forms'

export class CustomValidators {
  static match (firstControlName: string, secondControlName: string, customError = 'validatematch') {
    return (fg: FormGroup) => {
      return fg.get(firstControlName).value === fg.get(secondControlName).value ? null : { [customError]: true }
    }
  }
}

export const validators = {
  password: 'password',
  confirmPassword: 'confirmPassword',
  validate: 'password-validatematch'
}
