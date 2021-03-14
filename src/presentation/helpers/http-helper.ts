import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error) => ({
        statusCode: 400,
        body: error
})

export const serverError = (): HttpResponse => ({
        statusCode: 500,
        body: new ServerError
})