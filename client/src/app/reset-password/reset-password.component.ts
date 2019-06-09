import { Component, OnInit, Inject } from '@angular/core';//
import { UsersService } from '../services/users.service';//
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';//
import { __await } from 'tslib';//
import { Router } from '@angular/router';//
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';//
export interface DialogData {
  code: any;
}//

@Component({
  selector: 'app-code-dialog',
  templateUrl: './code-dialog.component.html',
})
export class CodeDialogComponent implements OnInit {
  code: any;
  constructor(
    public dialogRef: MatDialogRef<CodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private Users: UsersService) {}
    ngOnInit() {


    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}//

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  durationInSeconds = 3;
  registerForm: FormGroup;
  submitted = false;
  code: any;
  enteredCode: any;
  isNotVerified: boolean;
  isVerified: boolean;
  constructor(    
    private Users: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.code = this.generatecode();
    console.log('Code Gen: ' + this.code);

  this.registerForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    alerts: ['', [Validators.requiredTrue]],
    phone: ['', Validators.required, Validators.minLength(9)]
    });
  }
  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
 openDialog(): void {
   // Uncomment this
    // this.Users.sendCode(this.code);
    const dialogRef = this.dialog.open(CodeDialogComponent, {
      width: '300px',
      data: { code : this.code}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.enteredCode = result;
      console.log(this.enteredCode);
      if (this.code == this.enteredCode) {
        this.isNotVerified = false;
        this.isVerified = true;

      } else {
        this.isNotVerified = true;
        this.isVerified = false;
      }

    });

  }
  generatecode() {
    const min = 0;
    const max = 9;
    let rand;
    let num = '';
    for (let i = 0; i < 6; i++) {
        rand = min + Math.random() * (max - min);
        num += Math.round(rand);
    }
    return num;
  }

  get f() {
    return this.registerForm.controls;
  }

  async addUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm.errors);
      console.log(this.registerForm.invalid);
      return;
    }
    console.log(this.registerForm.get('name').value);

    const user = {
          Password: this.registerForm.get('password').value,
    };
    /**
     * Add user
     */

    // Check if user with same email already exists
    // this.Users.getUser(this.registerForm.get('email').value).then(data => {
    //   console.log(JSON.stringify(data));
    //   if (data.length > 0) {
    //     console.log('User already exists');
    //     alert('User already exists with this Email address');
    //   } else {
    //     console.log('New User');

    //     if (this.isVerified) {
    //       this.openSnackBar();
    //       this.Users.putUser(user);
    //       this.router.navigate(['/']);
    //     } else {
    //       alert('Registration Unsuccessful');

    //     }


    //   }
    // });
  
  }
}
@Component({
  selector: 'app-snack',
  templateUrl: 'snack-bar-component.html',
  styles: [`
    .example-pizza-party {
      color: teal;
    }
  `],
})
export class SnackBarComponent {}