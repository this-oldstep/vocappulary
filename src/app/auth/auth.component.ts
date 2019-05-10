import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { RouterExtensions} from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TextField  } from 'tns-core-modules/ui/text-field';
import { AuthService } from './auth.service';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { LangModalComponent } from '../components/lang-modal/lang-modal.component';
import { UIService } from '../shared/ui.serivce';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';


@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id,
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  isLogin = true;
  isLoading = false;
  natLangStr = 'english';
  natLangId = 1;
  learnLangStr = 'english';
  learnLangId = 1;
  @ViewChild('passwordEl') passwordEl: ElementRef<TextField>;
  @ViewChild('emailEl') emailEl: ElementRef<TextField>;
  @ViewChild('usernameEl') usernameEl: ElementRef<TextField>;


  constructor(
    private router: RouterExtensions, 
    private authService: AuthService,
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private uiService: UIService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {updateOn: 'blur', validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {updateOn:'blur', validators: [Validators.required, Validators.minLength(6)]}),
      username: new FormControl(null, {updateOn: 'blur'})
    });
    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordControlIsValid = status === 'VALID';
    });
    this.form.get('username').statusChanges.subscribe(status => {

    });

  
  }


  onSubmit() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();

    if(!this.form.valid) {
      return;
    }
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    const username = this.form.get('username').value;
    this.form.reset();
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;
    this.isLoading = true;
    if (this.isLogin) {
      this.authService.login(email, password).then(resData => {
        this.authService.user.subscribe(user => {
          if (user) {
            this.isLoading = false;
            this.router.navigate(["/landing"], {clearHistory: true});
          } else {
            this.isLoading = false;
          }
        }, err => {
          this.isLoading = false;
        })

      });
    } else {
      // const natLang = this.form.get('natLang').value;
      this.authService.signUp(email, password, this.natLangId, this.learnLangId, username).then(resData => {
        this.authService.user.subscribe(user => {
          if (user) {
            this.isLoading = false;
            this.router.navigate(["/landing"], {clearHistory: true});
          } else {
            this.isLoading = false;
          }
        }, err => {
          this.isLoading = false;
        })
      });
    }
  }

  onDone() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  stopSpinner() {
    this.isLoading = false;
  }

  onChangeNative() {
    console.log('press')
    this.modalDialog.showModal(LangModalComponent, {
      fullscreen: true, 
      viewContainerRef: this.uiService.getRootVCRef() 
      ? this.uiService.getRootVCRef()
      : this.vcRef
    })
    .then((action: Array<any>) => {
      this.natLangStr = action[0];
      this.natLangId = action[1];
      console.log(this.natLangStr, 'auth');
    })
  }
  onChangeLearning() {
    console.log('press')
    this.modalDialog.showModal(LangModalComponent, {
      fullscreen: true, 
      viewContainerRef: this.uiService.getRootVCRef() 
      ? this.uiService.getRootVCRef()
      : this.vcRef
    })
    .then((action: Array<any>) => {
      this.learnLangStr = action[0];
      this.learnLangId = action[1];
      console.log(this.learnLangStr, 'auth');
    })
  }
}
