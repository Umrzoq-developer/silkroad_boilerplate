import { gql } from "@apollo/client";

export const permissionBaseFragment = gql`
  fragment permissionBaseFragment on Permission {
    code
    title
  }
`;
