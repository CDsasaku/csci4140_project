import { NotificationStatus } from "../constants/types";

class Notification {
  id: number;
  content: string;
  uid: number;
  status: NotificationStatus;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
      id: number = 0,
      content: string = '',
      uid: number = 0,
      status: NotificationStatus = NotificationStatus.UNREAD,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()

  ) {
      this.id = id;
      this.content = content;
      this.uid = uid;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
  }
}

export { Notification };