import { Component } from "@angular/core"
import * as Platform from "platform"
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['/login.component.css'],
  moduleId: module.id
})
export class Login { 
  onSignIn() {
    console.log(Platform.device.language);
  }
} 