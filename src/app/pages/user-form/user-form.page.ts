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
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
})
export class UserFormPage implements OnInit {
  @Input() user: User = new Object as User;
  public profiles$: Observable<Profile[]> = this._profileService.getAll()
  formUser!: FormGroup

  constructor(
    private _profileService: ProfileService,
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.pattern('[0-9]{10}')]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      password_confirmation: [null, [Validators.required]],
      profile_id: [null, [Validators.required]]
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

          alert.onWillDismiss().then(() => this._navCtrl.back());
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
    // const loader = await this._alertService.loader('Salvando usuário...');
    // await loader.present();

    // this._userService.create(user)
    //   .then(async (u: User) => {
    //     this._userStore.users = [f, ...this._userStore.users];
    //     console.log('# this._userStore.users ', this._userStore.users);

    //     const msg = 'Cadastro de Usuário';
    //     const msgTwo = 'Usuário salvo com sucesso';
    //     const alert = await this._alertService.alert(msg, msgTwo);
    //     alert.onWillDismiss().then(() => this._navCtrl.back());
    //     await alert.present();
    //   })
    //   .catch(async (err) => {
    //     const msg = 'Cadastro de Usuário';
    //     const errorMsg = 'Erro ao salvar usuário;
    //     const alert = await this._alertService.alert(msg, errorMsg);
    //     await alert.present();
    //   })
    //   .finally(() => loader.dismiss());
  }
}
