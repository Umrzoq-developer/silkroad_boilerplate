export const notificationTypes = ["Load edit"] as const;
export type NotificationType = typeof notificationTypes[number];

export type NotificationFragment = {
  _id: string;
  title: string;
  content: string;
  type: NotificationType;
  relationId: string;
  sendDate: number;
  readDate?: number;
};

export type NotificationsSearchInput = {
  recieverId: string;
  isRead?: boolean;
};

export type NotificationsQueryVars = {
  searchInput: NotificationsSearchInput;
};

export type NotificationsQueryResult = {
  notifications: NotificationFragment[];
};

export type NotificiationSentSubscriptionInput = {
  userId: string;
};

export type NotificiationSubscriptionVars = {
  input: NotificiationSentSubscriptionInput;
};

export type NotificationsSubscriptionResult = {
  newNotification: NotificationFragment;
};

export type ClearUnreadNotificationsVars = {
  readDate: Number;
};

export type ClearUnreadNotificationsResult = {
  result: true;
};

export type MarkNotificationMutationVars = {
  notificationId: string;
  readDate: number;
};

export type MarkNotificationMutationResult = {
  result: true;
};
