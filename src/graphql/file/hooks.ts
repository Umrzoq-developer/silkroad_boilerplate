import { useState, useEffect } from "react";
import { useMutation, QueryHookOptions, useLazyQuery } from "@apollo/client";
import * as shortid from "shortid";
import { produce } from "immer";
import { message as ms } from "antd";
import { uploadFilesMutation } from "./mutation";
import { UploadMutationResult, UploadMutationVars } from "./types";
import { deleteFileMutation, DeleteFileMutationResult, DeleteFileMutationVars, FileFragment, FilesQueryResult, FilesQueryVars } from ".";
// import { showError } from "../../components";
import { filesQuery } from "./query";

type UploadingFile = {
  _id: string;
  key: string; // it is not s3 key
  url: string;
  name: string;
  mimeType: string;
  percentage: number;
  isUploadStarted?: boolean;
};

export function useFilesQuery(options: QueryHookOptions<FilesQueryResult, FilesQueryVars> = {}) {
  const [loadFiles, { loading }] = useLazyQuery<FilesQueryResult, FilesQueryVars>(filesQuery, options);

  return { loadFiles, loading };
}

export function useUploadFiles(defaultFileIds: string[] = [], onUpload?: (uploadedFileId: string) => Promise<void>) {
  const [files, setFiles] = useState<Record<string, UploadingFile>>({});

  const filesQuery = useFilesQuery({
    skip: !defaultFileIds.length,
    fetchPolicy: "network-only",
    onCompleted: ({ files }) => {
      console.log("filehook:", files);
      files.forEach((file) => {
        addFileToSet({ ...file });
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const [mutation] = useMutation<UploadMutationResult, UploadMutationVars>(uploadFilesMutation, {
    onCompleted: (data) => {
      console.log(data.result, "uploaded data");
    },
    onError: (err) => {
      console.log(err.message, "error message")
      ms.error({
        content: err.message,
        style: {
          marginTop: '30px',
        },
      });
    },
  });
  const [deleteMutation] = useMutation<DeleteFileMutationResult, DeleteFileMutationVars>(deleteFileMutation, {
    onError: (err) => {
      console.log(err.message, "error message");
      ms.error({
        content: err.message,
        style: {
          marginTop: '30px',
        },
      });
    },
  });

  useEffect(() => {
    filesQuery.loadFiles({
      variables: {
        fileIds: defaultFileIds,
      },
    });
  }, []);

  function addFileToSet(file: File | FileFragment) {
    const key = shortid.generate();

    if (file instanceof File) {
      setFiles((state) =>
        produce(state, (draftState) => {
          draftState[key] = {
            _id: "",
            key,
            name: file.name,
            mimeType: file.type,
            percentage: 0,
            url: URL.createObjectURL(file),
          };
        })
      );

      markFileAsUploading(key);

      mutation({
        variables: {
          files: [file],
        },
        context: {
          fetchOptions: {
            onUploadProgress: (progress: ProgressEvent<EventTarget>) => {
              const percentage = Number(((progress.loaded / progress.total) * 100).toFixed());
              setFileUploadPercentage(key, percentage > 95 ? 95 : percentage);
            },
          },
        },
      }).then(async ({ data }) => {
        if (!data) return;

        if (onUpload) {
          await onUpload(data.result[0]._id);
        }

        setFiles((state) =>
          produce(state, (draftState) => {
            draftState[key].percentage = 100;
            draftState[key]._id = data.result[0]._id;
          })
        );
      });
    } else {
      setFiles((state) =>
        produce(state, (draftState) => {
          draftState[file.key] = {
            _id: file._id,
            key: file.key,
            name: file.name,
            mimeType: file.mimeType,
            percentage: 100,
            url: `${process.env.REACT_APP_API_BASE_URL}/download/${file.key}`,
          };
        })
      );
    }
  }

  function markFileAsUploading(key: string) {
    setFiles((state) =>
      produce(state, (draftState) => {
        draftState[key].isUploadStarted = true;
      })
    );
  }

  function setFileUploadPercentage(key: string, percentage: number) {
    setFiles((state) =>
      produce(state, (draftState) => {
        draftState[key].percentage = percentage;
      })
    );
  }

  async function deleteFile(_id: string) {
    await deleteMutation({
      variables: {
        fileId: _id,
      },
    });

    setFiles((state) =>
      produce(state, (draftState) => {
        const deletedKey = Object.keys(draftState).find((key) => {
          return draftState[key]._id === _id;
        });

        if (deletedKey) delete draftState[deletedKey];
      })
    );
  }

  function getFilesInArray() {
    return Object.keys(files).map((key) => ({
      ...files[key],
    }));
  }

  return {
    files,

    deleteFile,
    addFileToSet,
    getFilesInArray,
  };
}

export type UseUploadFilesHook = ReturnType<typeof useUploadFiles>;
