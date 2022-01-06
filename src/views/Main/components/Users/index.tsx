import { useUsersQuery } from '@/graphql/user';
import React, { lazy, Suspense } from 'react';
// import UserItem from '../UserItem';
import './index.scss';

const UserItem = lazy(() => import('../UserItem'));

const Users: React.FC = () => {
  const usersQuery = useUsersQuery();

  return (
    <Suspense fallback={<div>card uploading</div>}>
      <div className="card__wrapper">
        {usersQuery?.data?.users &&
          usersQuery?.data?.users?.map(item => {
            return <UserItem key={item._id} name={item.name} />;
          })}
      </div>
    </Suspense>
  );
};

export default Users;
