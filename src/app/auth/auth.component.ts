import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { RouterExtensions} from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TextField  } from 'tns-core-modules/ui/text-field';
import { AuthService } from './auth.service';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { LangModalComponent } from '../components/lang-modal/lang-modal.component';
import { UIService } from '../shared/ui.serivce';


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
  @ViewChild('passwordEl') passwordEl: ElementRef<TextField>;
  @ViewChild('emailEl') emailEl: ElementRef<TextField>;
  @ViewChild('natLangEl') natLangEl: ElementRef<TextField>;


  constructor(
    private router: RouterExtensions, 
    private authService: AuthService,
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private uiService: UIService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {updateOn: 'blur', validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {updateOn:'blur', validators: [Validators.required, Validators.minLength(6)]})
    });
    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordControlIsValid = status === 'VALID';
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
      this.authService.signUp(email, password, this.natLangId).then(resData => {
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

  onChangeStatus() {
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
}
