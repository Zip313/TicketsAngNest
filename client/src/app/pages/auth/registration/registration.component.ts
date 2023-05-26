import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/IUser";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../services/config/config.service";
import {UserService} from "../../../services/user/user.service";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  isNeedSaveToLocalStorage: false;
  showCardNumber: boolean;

  constructor(private messageService:MessageService,
    private authService:AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }




  registration(userObject: IUser): void {
      this.authService.saveUserRest(userObject)
        .subscribe(
          data=>{
              this.messageService.add({
                severity: 'success',
                summary: `Пользователь ${userObject.login} успешно зарегистрирован`,
            })

          },
          error => {
            console.log(error)
            this.messageService.add({
              severity:'warn',
              summary:`Ошибка регистрации (${error.error.errorText})`,
            });
          }
        );



    }


  removeUsersFromLocalStorage($event: MouseEvent) {
    this.userService.removeUsersFromLocalStorage();
  }

  sendForm(form: NgForm): boolean | void {
    const user = form.value;
    if(user.psw!=user.pswRepeat){
      this.messageService.add({
        severity:'error',
        summary:'Ошибка валидации',
        detail:'Некорректно подтвержден пароль'
      });
      return false;
    }
    delete user['pswRepeat']
    console.log(form.value)
    console.log(user)
    form.reset();

    return this.registration(user)
  }
}

