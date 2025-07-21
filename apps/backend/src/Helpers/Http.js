export class Http {
  static STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  static makeResponse(status, data) {
    return {
      status,
      body: data
    };
  }
}
