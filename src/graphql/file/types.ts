import { UserBaseFragment } from "../user";

export type FileFragment = {
  _id: string;
  key: string;
  name: string;
  mimeType: string;
  size: string;
  createdDate: number;
  createdBy: UserBaseFragment;
  thumbnail?: string;
};

export type UploadMutationVars = {
  files: File[];
};

export type UploadMutationResult = {
  result: FileFragment[];
};

export type DeleteFileMutationVars = {
  fileId: string;
};

export type DeleteFileMutationResult = {
  result: true;
};

export type FilesQueryVars = {
  fileIds: string[];
};

export type FilesQueryResult = {
  files: FileFragment[];
};
