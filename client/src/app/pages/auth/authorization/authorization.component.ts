import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Event, Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/IUser";
import {MessageService} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/config/config.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit,OnDestroy {
  login: string;
  psw: string;
  loginText='Логин';
  pswText='Пароль';
  selectedValue:boolean;
  isRememberMe:boolean;
  cardNumber:string;
  authTextButton:string;
  useUserCard:boolean = false;

  constructor(public authService:AuthService,
              private messageService:MessageService,
              private router:Router,
              public userService:UserService
              ) { }

  ngOnInit(): void {
    this.useUserCard = ConfigService.config.useUserCard;
    this.authTextButton='Авторизоваться';
    if (!this.userService.getUser()){
      this.checkAuth();
    }
  }
  ngOnDestroy(): void {
  }



  vipStatusSelected(event:Event):void{
    console.log('vipStatusSelected()',event)
  }
  onAuth(event:MouseEvent|null,user?:IUser|null):void {
    this.authService
      .checkUser(user?user:{login:this.login,psw:this.psw})
      .subscribe(
        data=>{
        console.log(data);
        const resUser =  user?user:{login:this.login,psw:this.psw};
        resUser.id = data.id;
        this.userService.setUser(resUser);
        this.userService.Token = data.access_token;
        if(this.isRememberMe) this.userService.rememberUser();

        this.messageService.add({
          severity: 'success',
          summary: `Авторизация успешна `,
        });
        this.router.navigate(['tickets/tickets-list'],{queryParams:{ param1:true}});
        },
        error => {
        this.messageService.add({
            severity: 'error',
            summary: `Имя пользователя или пароль не совпадают`,
          });
        })


  }

  checkAuth(){

    if(this.userService.getUser()){
      this.onAuth(null,this.userService.getUser())
    }
  }

  logout() {
    this.userService.setUser(null);
    this.userService.removeUserFromStorage();
  }
}
