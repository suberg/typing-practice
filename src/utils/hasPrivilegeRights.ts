import { Admin } from '../entities/admin';
import { Moderator } from '../entities/moderator';
import type { User } from "../entities/user";

const hasUserPrivilegeRights = (user: User): boolean => Admin.is(user) || Moderator.is(user);

export default hasUserPrivilegeRights;