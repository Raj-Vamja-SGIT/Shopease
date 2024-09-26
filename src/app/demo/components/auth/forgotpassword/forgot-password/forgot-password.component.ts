import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/demo/service/common.service';
import { ForgotpasswordService } from 'src/app/demo/service/forgotpassword.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';
import { ForgotPasswordRequestModel } from '../../../common/models/model';

@Component({
  selector: 'app-forgot-password',
  styles: [
    `
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
        .txt-hover {
            color: #9aa9b3 !important;
            text-decoration: none;
        }

        .txt-hover:hover {
            color: #f96159 !important;
        }
    `,
],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  EmailId!: string;
  loading: boolean = false;
  forgotPasswordForm: any = FormGroup;


   ForgotPasswordModel: ForgotPasswordRequestModel= {
    Email: '',
    ClientURL: '',
  }

  constructor(
    public layoutService: LayoutService,
    private service: CommonService,
    private toastr: ToastrMessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private frogotpasswordservice:ForgotpasswordService

) {
}

ngOnInit(): void {
  this.initForgotForm();
}

initForgotForm() {
  this.forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
  });
}

forgotPassword() {
  debugger
  if (this.forgotPasswordForm.valid) {
  
      this.ForgotPasswordModel.Email= this.forgotPasswordForm.value.email,
      this.ForgotPasswordModel.ClientURL= environment.PortalUrl + '/changepassword'
  
    
    this.spinner.show();

    this.frogotpasswordservice.forgotPassword(this.ForgotPasswordModel).subscribe(
      (data: any) => {
        this.spinner.hide();
        if (data.success) {
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.error.message || 'An error occurred');
      }
    );
  } 
}

  
}
