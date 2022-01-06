import React from 'react';
import Users from './components/Users';
import { useUsersQuery } from '@/graphql/user';

const Main: React.FC = () => {
  const usersQuery = useUsersQuery();

  console.log(usersQuery, 'data');
  if (usersQuery.loading) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }
  return (
    <div>
      <h3>Main Page</h3>
      <Users />
    </div>
  );
};

export default Main;
