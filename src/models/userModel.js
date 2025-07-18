export class User {
  constructor(username, email, document, fullname) {
    this.username = username;
    this.email = email;
    this.document = document;
    this.fullname = fullname;
  }

  validateUserFields() {
    const REQUIRED_FIELDS = ['username', 'email'];

    for (const field of REQUIRED_FIELDS) {
      if (!this[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }

  updateUser(id, user) {
    
  }
}
