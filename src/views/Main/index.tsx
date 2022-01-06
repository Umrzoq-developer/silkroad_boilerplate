import React from "react";
import { useUsersQuery } from "../../graphql/user";
import Users from "./components/Users";

const Main = () => {
  const usersQuery = useUsersQuery();

  console.log(usersQuery, "data");
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
