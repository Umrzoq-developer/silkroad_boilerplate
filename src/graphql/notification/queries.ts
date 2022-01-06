import { gql } from "@apollo/client";

import { notificationBaseFragment } from "./fragments";

export const notificationsQuery = gql`
  query Notifications($searchInput: NotificationsSearchInput!) {
    notifications(searchInput: $searchInput) {
      ...notificationBaseFragment
    }
  }
  ${notificationBaseFragment}
`;
