import { gql } from "@apollo/client";
import { userBaseFragment } from "../user";

export const fileFragment = gql`
  fragment fileFragment on File {
    _id
    key
    name
    mimeType
    size
    url
    createdDate
    createdBy {
      ...userBaseFragment
    }
  }
  ${userBaseFragment}
`;
