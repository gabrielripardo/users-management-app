import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user-model';
import { ModalController } from '@ionic/angular';
import { UserFormComponent } from '../components/user-form/user-form.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  users: User[] = [];

  constructor(
    public _userService: UserService,
    private _modal: ModalController,
  ) {}

  ngOnInit(){
    this._userService.getAll().subscribe(res => {
      console.log('# res: ', res);

      this.users = res
    })
  }

  async openForm(user: User = new Object as User){
    console.log('# user ', user);
    const modal = await this._modal.create({
      component: UserFormComponent,
      componentProps: {
        user
      }
    });

    modal.onWillDismiss()
      .then((user: any) => {
          console.log('# modal.onWillDismiss ', user);
      });

    await modal.present();
  }
}
