import { Injectable } from '@angular/core';
import data from '../assets/data.json';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private users: any[] = data; 
  
  constructor( ) {}
 
   
  addUser(user: any): void {
    console.log("Before Add"+JSON.stringify(this.users));
    this.users.push(user);
    console.log("Before Add"+JSON.stringify(this.users));
  }

  
  updateUser(oldUser:any,updatedUser: any): void {
    const index = this.users.findIndex(user => user.username == oldUser.username);
    if (index !== -1) {
      this.users[index] = updatedUser;
      
    }
  }

  getUsers(): any[]{
    return this.users;
  }

  deleteUser(user: any): void {
    console.log('Before deletion:', this.users);
  
    const index = this.users.findIndex(u =>
      u.username === user.username &&
      u.email === user.email &&
      u.phone === user.phone &&
      u.passwordHint === user.passwordHint
    );
  
    console.log('Index:', index);
  
    if (index !== -1 && this.users.length > 1) {
      this.users.splice(index, 1);
      console.log('After deletion:', this.users);
    } else {
      console.log('Cannot delete the last user.');
    }
  }
  
}