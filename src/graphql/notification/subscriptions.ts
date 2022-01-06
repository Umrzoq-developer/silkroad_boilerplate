import { gql } from "@apollo/client";
import { notificationBaseFragment } from "./fragments";

export const notificationsSubscription = gql`
  subscription OnNotificationSent($input: NotificationSentSubscriptionInput!) {
    newNotification: notificationSent(input: $input) {
      ...notificationBaseFragment
    }
  }
  ${notificationBaseFragment}
`;
