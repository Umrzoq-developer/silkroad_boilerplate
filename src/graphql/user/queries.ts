import { gql } from "@apollo/client";

import { userBaseFragment, dispatcherBaseFragment } from "./fragments";

export const loggedUserQuery = gql`
  query LoggedUser {
    result: loggedUser {
      ...userBaseFragment
    }
  }
  ${userBaseFragment}
`;

export const usersQuery = gql`
  query Users {
    users {
      ...userBaseFragment
    }
  }
  ${userBaseFragment}
`;

export const dispatchersQuery = gql`
  query Dispatchers {
    dispatchers {
      ...dispatcherBaseFragment
    }
  }
  ${dispatcherBaseFragment}
`;
