export class User {
    constructor(public email: string, 
        public id: number, 
        public username: string,
        public currentLanguageId: number,
        public nativeLanguageId: number,
        public points: number,
        public _token: string, 
        public _tokenExpirationDate: Date,

        
        ) {}

        get token() {
            return this._token;
        }
}