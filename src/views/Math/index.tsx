import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  RcFile,
  UploadFile,
  UploadChangeParam,
} from 'antd/lib/upload/interface';
import './index.scss';
import { useUploadFiles } from '@/graphql/file';

const Math: React.FC = () => {
  const uploadImg = useUploadFiles();

  const dummyRequest = ({ file, onSuccess }: any) => {
    console.log(file, '====== file ====== ');
    uploadImg.addFileToSet(file);
    setTimeout(() => {
      onSuccess('ok');
    }, 3000);
  };
  const props = {
    accept: '.txt, .csv, .jpg, .png',
    customRequest: dummyRequest,
    beforeUpload: (file: RcFile, fileList: RcFile[]) => {
      // console.log(file, fileList, 'file list');
    },
    onChange: (file: UploadChangeParam<UploadFile<any>>) => {
      // console.log('uploaded', file);
    },
  };

  return (
    <div className="math__wrapper">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>
    </div>
  );
};

export default Math;
