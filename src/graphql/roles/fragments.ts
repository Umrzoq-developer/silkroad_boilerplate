import { gql } from "@apollo/client";

export const roleBaseFragment = gql`
  fragment roleBaseFragment on Role {
    title
  }
`;
