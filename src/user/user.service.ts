import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
  return this.users.find(user => user.id === id);
}


  create(user: Omit<User, 'id'>): User {
    const newUser = { id: this.idCounter++, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: Partial<User>): User | undefined {
  const user = this.findOne(id);
  if (!user) return;
  Object.assign(user, updatedUser);
  return user;
}


  remove(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}