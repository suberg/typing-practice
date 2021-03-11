import type { User } from "../entities/user";
import UserService from "./user-service";
export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: string, password: string): Promise<User> {
    const foundedUser = await this.userService.findUserByCredentials({ email, password });

    if (!foundedUser) {
      throw new Error("User not found ☹️");
    }

    const constructorByRole = this.userService.getConstructorByRole(foundedUser.role);
    const user = constructorByRole.from(foundedUser);

    return user;
  }
}
