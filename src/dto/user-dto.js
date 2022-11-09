class UserDto {
    email;
    id;
    isActivated;
    type;

    constructor(model) {
        this.email = model.email
        this.id = model.id
        this.isActivated = model.isActivated
        this.type = model.type
    }
}

module.exports = UserDto