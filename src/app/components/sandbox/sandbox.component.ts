import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'sandbox',
  template: `
    <h1>Hello World</h1>
    <form (submit)="onSubmit(isEdit)">
      <div>
        <label>Name</label>
        <input type="text" [(ngModel)]="user.name" name="name">
      </div>
      <div>
        <label>Email</label>
        <input type="text" [(ngModel)]="user.email" name="email">
      </div>
      <div>
        <label>Phone</label>
        <input type="text" [(ngModel)]="user.phone" name="phone">
      </div>
      <input type="submit" class="btn" value="Submit">
    </form>
    <hr>
    <div *ngFor="let user of users">
      <ul>
        <li>{{ user.name }}</li>
        <li>{{ user.email }}</li>
        <li>{{ user.phone }}</li>
      </ul>
      <button (click)="onEditClick(user)">edit</button>
      <button (click)="onDeleteClick(user.id)">del</button>
      <br><br>
    </div>

  `
})

export class SandboxComponent {
  users:any[];
  user = {
    id: '',
    name: '',
    email: '',
    phone: ''
  }
  isEdit:boolean = false;

  constructor(public dataService:DataService) {
    this.dataService.getUsers().subscribe( users => {
      console.log(users);
      this.users = users;
    })
  }

  onSubmit(isEdit) {
    if(isEdit) {
      this.dataService.updateUser(this.user).subscribe( user => {
        for(let i = 0; i < this.users.length; i++) {
          if(this.users[i].id === this.user.id) {
            this.users.splice(i, 1);
          }
        }
        this.users.unshift(this.user);
      }
    }
    else {
      this.dataService.addUser(this.user).subscribe( user => {
        console.log(user);
        this.users.unshift(user);
      });
    }
  }

  onDeleteClick(id) {
    this.dataService.deleteUser(id).subscribe( res => {
      for(let i = 0; i < this.users.length; i++) {
        if(this.users[i].id === id) {
          this.users.splice(i, 1);
        }
      }
    })
  }

  onEditClick(user) {
    this.isEdit = true;
    this.user = user;
  }

}
