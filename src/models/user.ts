class User {
  uid: number;
  role: string;
  username: string;
  email?: string;
  verified?: Date;
  icon?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
      uid: number = 0,
      role: string = '',
      username: string = '',
      email?: string,
      verified?: Date,
      icon?: string,
      createdAt?: Date,
      updated_at?: Date,
  ) {
      this.uid = uid;
      this.role = role;
      this.username = username;
      this.email = email;
      this.verified = verified;
      this.icon = icon;
      this.createdAt = createdAt;
      this.updatedAt = updated_at;
  }
}

export { User };