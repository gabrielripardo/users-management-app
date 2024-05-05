import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user-model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  users: User[] = [];


  constructor(
    public _userService: UserService,
  ) {}

  ngOnInit(){
    this._userService.getAll().subscribe(res => {
      console.log('# res: ', res);

      this.users = res
    })
  }

}
