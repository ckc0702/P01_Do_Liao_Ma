export class UpdateUser{
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public name:string
    ){}
}