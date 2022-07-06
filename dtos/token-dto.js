module.exports =  class TokenDto {
    id;
    email;
    role;
    isActivated;

    constructor(data){
        this.id = data._id;
        this.email = data.email;
        this.role = data.role
        this.isActivated = data.isActivated;
    }
}