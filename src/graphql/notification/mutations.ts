import { gql } from "@apollo/client";

export const clearUnreadNotifications = gql`
  mutation ClearUnreadNotifications($readDate: Float!) {
    clearUnreadNotifications(readDate: $readDate)
  }
`;

export const markNotificationAsRead = gql`
  mutation MarkNotificationAsRead(
    $notificationId: ObjectId!
    $readDate: Float!
  ) {
    result: markNotificationAsRead(
      notificationId: $notificationId
      readDate: $readDate
    )
  }
`;
