import { User } from "./user";

class Item {
  id: number;
  name: string;
  description: string;
  User: User;
  condition?: string;
  image?: string;
  uid: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
      id: number = 0,
      name: string = '',
      description: string = '',
      User: User,
      condition?: string,
      image?: string,
      uid: number = 0,
      createdAt?: Date,
      updated_at?: Date,

  ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.condition = condition;
      this.image = image;
      this.uid = uid;
      this.createdAt = createdAt;
      this.updatedAt = updated_at;
      this.User = User;
  }
}

export { Item };