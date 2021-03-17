import type { User } from '../entities/user';
import { Email } from '../entities/email';
import { Password } from '../entities/password';
import UserService from './user-service';
import type { Credentials } from "../hooks/use-login";
export default class LoginService {
    constructor(private readonly userService: UserService) {}

    static checkCredentials(credentials: Credentials) {
        return {
            email: Email.check(credentials.email),
            password: Password.check(credentials.password),
        };
    }

    public async login(email: Email, password: Password): Promise<User> {
        const foundedUser = await this.userService.findUserByCredentials({
            email,
            password,
        });

        if (!foundedUser) {
            throw new Error('User not found ☹️');
        }

        return foundedUser;
    }
}
