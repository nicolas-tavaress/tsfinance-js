export class User {
  constructor(json) {
    this.username = json.username;
    this.email = json.email;
    this.document = json.document;
    this.fullname = json.fullname;
  }

  validateUserFields() {
    const REQUIRED_FIELDS = ['username', 'email'];

    for (const field of REQUIRED_FIELDS) {
      if (!this[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }
}
