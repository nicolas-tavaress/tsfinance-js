class UserDTO {
  constructor(user) {
    console.log(user)
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.document = user.document;
  }

}

export default UserDTO;