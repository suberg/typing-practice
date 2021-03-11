import { Role } from "./role";
import { Operation } from "./operation";

export const AvailableOperations = {
  [Role.ADMIN]: {
    [Role.ADMIN]: [Operation.UPDATE_TO_MODERATOR],
    [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
    [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN],
  }, 
  [Role.CLIENT]: {
    [Role.ADMIN]: [],
    [Role.CLIENT]: [],
    [Role.MODERATOR]: [],
  }, 
  [Role.MODERATOR]: {
    [Role.ADMIN]: [],
    [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
    [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT],
  }, 
};

export type AvailableOperationsType = typeof AvailableOperations;
