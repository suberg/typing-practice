import { Role } from "../entities/role";
import { castTo } from "../entities/role-to-user";
import { User } from "../entities/user";
import { AvailableOperations, AvailableOperationsType } from "../entities/available-operations";
import type { RoleToUser } from "../entities/role-to-user";
import type { Credentials } from "../hooks/use-login";
export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => User.check(u));
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: RoleToUser[R],
    newRole: R
  ) {
    const newUser = castTo(newRole, user);
    this.users = this.users.map((u) => (u.id === user.id ? newUser : u));
    return this.users;
  }

  async findUserByCredentials(credentials: Credentials): Promise<User | undefined> {
    const { email, password } = credentials;
    await this.getAllUsers();

    return this.users.find((user: User) => user.email === email && user.password === password);
  }

  getAvailableOperations<R1 extends Role, R2 extends Role>(user: User, currentUser: User): AvailableOperationsType[R2][R1] {
    return AvailableOperations[currentUser.role][user.role];
  }
}
