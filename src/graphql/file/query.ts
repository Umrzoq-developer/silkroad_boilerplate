import { gql } from "@apollo/client";

import { fileFragment } from "./fragments";

export const filesQuery = gql`
  query FilesQuery($fileIds: [ObjectId!]!) {
    files(fileIds: $fileIds) {
      ...fileFragment
    }
  }
  ${fileFragment}
`;
