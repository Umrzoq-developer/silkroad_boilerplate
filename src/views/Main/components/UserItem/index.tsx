import React from 'react';

interface IProps {
  name: string;
}

const UserItem = ({ name }: IProps) => {
  return <div>{name}</div>;
};

export default React.memo(UserItem);
