import { useRecoilState } from 'recoil';
import { useState } from "react";
import {
  useQuery,
  useMutation,
  QueryHookOptions,
  OperationVariables,
  MutationHookOptions,
} from "@apollo/client";
import { loggedUserQuery } from "./queries";
import { loginWithEmailMutation, loginWithGoogleMutation } from "./mutations";
import {
  LoggedUserQueryResult,
  LoginWithEmailMutationResult,
  LoginWithEmailMutationVars,
  LoginWithGoogleMutationResult,
  LoginWithGoogleMutationVars,
  ChangePasswordMutationResult,
  ChangePasswordMutationVars,
} from "./types";

import { AUTH_TOKEN } from "../../constants/ApiConstant";
import {
  changePasswordMutation,
  dispatchersQuery,
  DispatchersQueryResult,
  usersQuery,
  UsersQueryResult,
} from ".";
import { userDetail } from '../../store/auth';
import { useCookies } from 'react-cookie';

// Logging request 
export function useLoggedUserQuery(
  options: QueryHookOptions<LoggedUserQueryResult, OperationVariables> = {}
) {
  const [_, setAuthUser] = useRecoilState(userDetail)
  const [shouldSkip] = useCookies([AUTH_TOKEN]);
  const [loading, setLoading] = useState<boolean>(shouldSkip.auth_token ? false : true);

  const query = useQuery<LoggedUserQueryResult>(loggedUserQuery, {
    ...options,
    onCompleted: async (data) => {
      const { result } = data;

      if (!result) {
        localStorage.removeItem(AUTH_TOKEN);
      } else {
        setAuthUser(result);
      }

      if (options.onCompleted) {
        await options.onCompleted(data);
      }
      setLoading(false);
    },
    onError: async (err) => {
      console.error(err);
      localStorage.removeItem(AUTH_TOKEN);
      setAuthUser({
        email: '',
        password: '',
        isAuth: false,
      });

      if (options.onError) {
        await options.onError(err);
      }
      setLoading(false);
    },
    skip: shouldSkip.auth_token,
  });

  return { ...query, loading };
}
// users list
export function useUsersQuery() {
  const query = useQuery<UsersQueryResult>(usersQuery, {
    fetchPolicy: "network-only",
  });

  return query;
}

//dispatchers list
export function useDispatchersQuery() {
  const query = useQuery<DispatchersQueryResult>(dispatchersQuery, {
    fetchPolicy: "network-only",
  });

  return query;
}


// login with google
export function useLoginWithEmailMutation(
  options?: MutationHookOptions<
    LoginWithEmailMutationResult,
    LoginWithEmailMutationVars
  >
) {
  const mutation = useMutation<
    LoginWithEmailMutationResult,
    LoginWithEmailMutationVars
  >(loginWithEmailMutation, options);

  return mutation;
}

export function useLoginWithGoogleMutation(
  options: MutationHookOptions<
    LoginWithGoogleMutationResult,
    LoginWithGoogleMutationVars
  > = {}
) {
  const mutation = useMutation<
    LoginWithGoogleMutationResult,
    LoginWithGoogleMutationVars
  >(loginWithGoogleMutation, {
    ...options,
    onCompleted: async (data) => {
      const { result } = data;
      localStorage.setItem(AUTH_TOKEN, result);

      if (options.onCompleted) {
        await options.onCompleted(data);
      }
    },
    onError: async (err) => {
      if (process.env.NODE_ENV === "development") console.error(err);

      if (options.onError) {
        await options.onError(err);
      }
    },
  });

  return mutation;
}

// change password 
export function useChangePasswordMutation(
  options: MutationHookOptions<
    ChangePasswordMutationResult,
    ChangePasswordMutationVars
  > = {}
) {
  const mutation = useMutation<
    ChangePasswordMutationResult,
    ChangePasswordMutationVars
  >(changePasswordMutation, options);

  return mutation;
}
