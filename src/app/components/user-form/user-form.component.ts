import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile-model';
import { User } from 'src/app/models/user-model';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent  implements OnInit {
  @Input() user: User = new Object as User;
  public profiles$: Observable<Profile[]> = this._profileService.getAll()
  formUser!: FormGroup

  constructor(
    private _profileService: ProfileService,
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formUser = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.pattern('[0-9]{10}')]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      password_confirmation: [null, [Validators.required]],
      profile_id: [this.user.profile_id, [Validators.required]]
    },);
  }

  submitForm() {
    if (!this.formUser.valid) { return; }

    const { name, email, phone, password, profile_id } = this.formUser.value

    const body: User = {
      id: this.user.id,
      email,
      password,
      name,
      phone,
      profile_id
    };

    body.id ? this.update(body) : this.save(body);
  }

  private async save(user: User) {
    const titleAlert = "Cadastro de Usuário"
    const loader = await this._loadingCtrl.create({
      message: "Salvando usuário",
      spinner: "crescent",
    });
    await loader.present();

    console.log('# user ', user);
    this._userService.create(user).subscribe(
      {
        next: async (user: User) => {
          console.log("# success ", user)
          console.log('# user create was ', user);

          const alert = await this._alertCtrl.create({
            header: titleAlert,
            message: 'Usuário salvo com sucesso',
            buttons: ['Ok'],
          });

          await alert.present();

          alert.onWillDismiss().then(() => window.location.reload);
          loader.dismiss()
        },
        error: async (e) => {
          console.error("# error ", e)

          const alert = await this._alertCtrl.create({
            header: titleAlert,
            message: 'Erro ao Salvar usuário',
            buttons: ['Ok'],
          });

          await alert.present();
          loader.dismiss()
        }
      }
    )
  }


  private async update(user: User) {
    const titleAlert = "Editar Usuário"
    const loader = await this._loadingCtrl.create({
      message: "Salvando usuário",
      spinner: "crescent",
    });
    await loader.present();

    console.log('# user ', user);
    this._userService.update(user.id, user).subscribe(
      {
        next: async () => {
          const alert = await this._alertCtrl.create({
            header: titleAlert,
            message: 'Usuário salvo com sucesso',
            buttons: ['Ok'],
          });

          await alert.present();

          alert.onWillDismiss().then(() => window.location.reload);
          loader.dismiss()
        },
        error: async () => {
          const alert = await this._alertCtrl.create({
            header: titleAlert,
            message: 'Erro ao Salvar usuário',
            buttons: ['Ok'],
          });

          await alert.present();
          loader.dismiss()
        }
      }
    )
  }

}
