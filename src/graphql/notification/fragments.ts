import { gql } from "@apollo/client";

export const notificationBaseFragment = gql`
  fragment notificationBaseFragment on Notification {
    _id
    title
    content
    type
    relationId
    sendDate
    readDate
  }
`;
