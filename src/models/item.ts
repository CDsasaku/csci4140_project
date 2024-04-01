import { Condition } from "./condition";
import { User } from "./user";

class Item {
  id: number;
  name: string;
  description: string;
  uid: number;
  User: User;
  conditionId?: number;
  Condition?: Condition;
  image?: string;
  wishlist?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
      id: number = 0,
      name: string = '',
      description: string = '',
      uid: number = 0,
      User: User,
      conditionId?: number,
      Condition?: Condition,
      image?: string,
      wishlist?: string,
      createdAt?: Date,
      updated_at?: Date,

  ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.uid = uid;
      this.User = User;
      this.conditionId = conditionId;
      this.Condition = Condition;
      this.image = image;
      this.wishlist = wishlist;
      this.createdAt = createdAt;
      this.updatedAt = updated_at;
  }
}

export { Item };