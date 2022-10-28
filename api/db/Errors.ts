export interface ValidationError {
  errors?: {
    [key: string]: {
      properties: {
        message: string
      }
    }
  }
  properties?: { message: string }
}
export interface DuplicateKeyError {
  keyValue: { [key: string]: string }
}