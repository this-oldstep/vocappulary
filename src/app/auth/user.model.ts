export class User {
    constructor(public email: string, 
        public languageNative: string, 
        public learning: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date 
        ) {}

        get token() {
            return this._token;
        }
}