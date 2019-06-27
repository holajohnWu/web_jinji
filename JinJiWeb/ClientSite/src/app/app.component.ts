import { Component } from '@angular/core';
import { AuthService } from './shared-services/auth.service';
import { Router } from '@angular/router';

class Account {
  account: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientSite';

  account = new Account();

  constructor(public authService: AuthService,
    private router: Router) {

  }

  login() {
    this.authService.login(this.account.account, this.account.password)
      .subscribe(r => {
        this.router.navigate(['order']);
      },
        error => {
          console.log(error);
          alert("登入失敗");
        });
  }

  public logout() {
    this.authService.logout();
  }
}
