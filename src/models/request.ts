import { Item } from "./item";

class Request {
  id: number;
  itemId: number;
  availableItemId: number;
  availableItem?: Item;
  uid: number;
  createdAt?: string;
  updatedAt?: string;

  constructor(
      id: number = 0,
      itemId: number = 0,
      availableItemId: number = 0,
      availableItem: Item,
      uid: number = 0,
      createdAt: string = '',
      updatedAt: string = '',
  ) {
      this.id = id;
      this.itemId = itemId;
      this.availableItemId = availableItemId;
      this.availableItem = availableItem;
      this.uid = uid;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
  }
}

export { Request };