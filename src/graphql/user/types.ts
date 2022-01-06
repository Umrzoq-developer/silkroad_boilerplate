import { RoleBaseFragment } from "../roles";
import { PermissionBaseFragment } from "../permission";

export type UserBaseFragment = {
  _id: string;
  name: string;
  email: string;
  roles: RoleBaseFragment[];
  permissions: PermissionBaseFragment[];
};

export type DispatcherBaseFragment = {
  _id: string;
  name: string;
};

export type LoggedUserQueryResult = {
  result: UserBaseFragment;
};

export type UsersQueryResult = {
  users: UserBaseFragment[];
};

export type DispatchersQueryResult = {
  dispatchers: DispatcherBaseFragment[];
};

export type LoginWithEmailMutationVars = {
  email: string;
  password: string;
};

export type LoginWithEmailMutationResult = {
  result: string; // jwt token
};

export type LoginWithGoogleMutationVars = {
  idToken: string; // google's id token
};

export type LoginWithGoogleMutationResult = {
  result: string; // jwt token
};

export type ChangePasswordMutationVars = {
  oldPassword: string;
  newPassword: string;
};

export type ChangePasswordMutationResult = {
  result: boolean;
};
