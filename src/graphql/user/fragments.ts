import { gql } from "@apollo/client";
import { roleBaseFragment } from "../roles";
import { permissionBaseFragment } from "../permission";

export const userBaseFragment = gql`
  fragment userBaseFragment on User {
    _id
    name
    email
    roles {
      ...roleBaseFragment
    }
    permissions {
      ...permissionBaseFragment
    }
  }
  ${roleBaseFragment}
  ${permissionBaseFragment}
`;

export const dispatcherBaseFragment = gql`
  fragment dispatcherBaseFragment on User {
    _id
    name
  }
`;
