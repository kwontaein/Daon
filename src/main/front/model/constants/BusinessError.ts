export class BusinessError extends Error {
  digest ='custom error'
  constructor(errorJSON: string) {
    super(errorJSON);
    this.digest = errorJSON;
    this.name = 'BusinessError';
  }
}