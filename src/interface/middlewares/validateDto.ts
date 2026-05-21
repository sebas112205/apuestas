import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

function formatErrors(errors: ValidationError[]): string[] {
  return errors.flatMap((error) => {
    if (error.constraints) {
      return Object.values(error.constraints)
    }
    if (error.children && error.children.length) {
      return formatErrors(error.children)
    }
    return []
  })
}

export function validateDto(type: ClassConstructor<object>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body)
    const errors = await validate(dto)

    if (errors.length > 0) {
      return res.status(400).json({ error: formatErrors(errors) })
    }

    req.body = dto
    next()
  }
}
