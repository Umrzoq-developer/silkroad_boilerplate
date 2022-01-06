import { gql } from "@apollo/client";

export const loginWithEmailMutation = gql`
  mutation LoginWithEmail($email: String!, $password: String!) {
    result: loginWithEmail(email: $email, password: $password)
  }
`;

export const loginWithGoogleMutation = gql`
  mutation LoginWithGoogle($idToken: String!) {
    result: loginWithGoogle(idToken: $idToken)
  }
`;

export const changePasswordMutation = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    result: changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;
