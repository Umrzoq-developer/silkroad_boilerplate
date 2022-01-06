import { gql } from "@apollo/client";

import { fileFragment } from "./fragments";

export const uploadFilesMutation = gql`
  mutation UploadFilesMutation($files: [Upload!]!) {
    result: uploadFiles(files: $files) {
      ...fileFragment
    }
  }
  ${fileFragment}
`;

export const deleteFileMutation = gql`
  mutation DeleteFileMutation($fileId: ObjectId!) {
    result: deleteFile(fileId: $fileId)
  }
`;
