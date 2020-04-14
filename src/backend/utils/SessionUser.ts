import { v4 as uuidv4 } from 'uuid';
import { ILoginUser } from './setUserInSession';

export class SessionUser {
    public id: string;
    public username: string;
    public email: string;
    public loggedIn: boolean;
    public token: string;

    public constructor(user: ILoginUser) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.loggedIn = true;
        this.token = uuidv4();
    }
}
