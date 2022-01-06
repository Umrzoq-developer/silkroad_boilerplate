import {
  useQuery,
  QueryHookOptions,
  useSubscription,
  SubscriptionHookOptions,
  useMutation,
  MutationHookOptions,
  DefaultContext,
  ApolloCache,
} from '@apollo/client';

import { produce } from 'immer';

import { notificationsSubscription } from './subscriptions';
import { notificationsQuery } from './queries';
import {
  NotificationsSubscriptionResult,
  NotificiationSubscriptionVars,
  ClearUnreadNotificationsResult,
  ClearUnreadNotificationsVars,
  MarkNotificationMutationResult,
  MarkNotificationMutationVars,
  NotificationsQueryResult,
  NotificationsQueryVars,
} from './types';
import { clearUnreadNotifications, markNotificationAsRead } from './mutations';

export const useNotificationsQuery = (
  options: QueryHookOptions<NotificationsQueryResult, NotificationsQueryVars>,
) => {
  if (!options.variables) {
    throw new Error(`options.variables is required for useNotificationsQuery`);
  }

  const query = useQuery(notificationsQuery, {
    ...options,
  });

  useNotificationsSubscription({
    variables: {
      input: {
        userId: options.variables.searchInput.recieverId,
      },
    },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;

      const { newNotification } = subscriptionData.data;

      query.updateQuery(prevQueryResult =>
        produce(prevQueryResult, draftPrevQueryResult => {
          if (
            draftPrevQueryResult.notifications &&
            Array.isArray(draftPrevQueryResult.notifications)
          ) {
            console.log('update query', draftPrevQueryResult.notifications);
            draftPrevQueryResult.notifications.push(newNotification);
          }
        }),
      );
    },
  });

  return query;
};

// for main subs actions
export function useNotificationsSubscription(
  options: SubscriptionHookOptions<
    NotificationsSubscriptionResult,
    NotificiationSubscriptionVars
  >,
) {
  const subscription = useSubscription<
    NotificationsSubscriptionResult,
    NotificiationSubscriptionVars
  >(notificationsSubscription, options);

  return subscription;
}

export function useClearUnreadNotifications(
  options?: MutationHookOptions<
    ClearUnreadNotificationsResult,
    ClearUnreadNotificationsVars,
    DefaultContext,
    ApolloCache<any>
  >,
) {
  const mutation = useMutation<
    ClearUnreadNotificationsResult,
    ClearUnreadNotificationsVars
  >(clearUnreadNotifications, options);

  return mutation;
}

export function useMarkNotificationAsRead(
  options?:
    | MutationHookOptions<
        MarkNotificationMutationResult,
        MarkNotificationMutationVars,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined,
) {
  const mutation = useMutation<
    MarkNotificationMutationResult,
    MarkNotificationMutationVars
  >(markNotificationAsRead, options);

  return mutation;
}
