import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user-model';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public users$: Observable<User[]> = this._userService.getAll()

  constructor(
    public _userService: UserService,
    private _modal: ModalController,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
  ) {}

  ngOnInit(){}

  async openForm(user: User = new Object as User){
    console.log('# user ', user);
    const modal = await this._modal.create({
      component: UserFormComponent,
      componentProps: {
        user
      }
    });

    modal.onWillDismiss()
      .then(() => {
        this.reload()
    });

    await modal.present();
  }

  async removeUser(user: User){
    const titleAlert = "Remover Usuário"
    const loader = await this._loadingCtrl.create({
      message: "Removendo usuário",
      spinner: "crescent",
    });
    await loader.present();

    this._userService.remove(user.id).subscribe(
      {
        next: async () => {
          const alert = await this._alertCtrl.create({
            header: titleAlert,
            message: 'Usuário removido com sucesso',
            buttons: ['Ok'],
          });

          await alert.present();

          alert.onWillDismiss().then(() => this.reload() );
          loader.dismiss()
        },
        error: async () => {
          const alert = await this._alertCtrl.create({
            header: titleAlert,
            message: 'Erro ao remover usuário',
            buttons: ['Ok'],
          });

          await alert.present();
          loader.dismiss()
        }
      }
    )
  }

  private reload(){
    this.users$ = this._userService.getAll()
  }
}
