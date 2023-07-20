// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-user',
//   templateUrl: './add-user.component.html',
//   styleUrls: ['./add-user.component.css']
// })
// export class AddUserComponent {

// }

import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Detail } from '../detail';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  signupForm: any;
  title!: string;
  showOld!: boolean;
  totalFields!:number;
  name!: string
  constructor(private userService: UserService,
    private dialogRef: MatDialogRef<AddUserComponent, Detail>,
    @Inject(MAT_DIALOG_DATA) private data: any, private formBuilder: FormBuilder
  ) {
    this.title = this.data.title;
    this.showOld = this.data.flag;
  }

  ngOnInit() {

    if (this.data.flag) {

      // alert(JSON.stringify(this.data.userData));
this.totalFields = 7;
      this.signupForm = this.formBuilder.group({
        username: [ this.data.userData.username, Validators.required],
        email: [this.data.userData.email , [Validators.required, Validators.email]],
        phone: [ this.data.userData.phone  , [Validators.required, Validators.pattern(('^[0-9]+$'))]],
        oldPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])(?=.*[a-zA-Z0-9!@#$%^&*]).{15,}$/)]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])(?=.*[a-zA-Z0-9!@#$%^&*]).{15,}$/)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])(?=.*[a-zA-Z0-9!@#$%^&*]).{15,}$/), this.validateEqual('password')]],
        passwordHint: [ this.data.userData.passwordHint , Validators.required]

      });
    }




    else {
      this.totalFields = 6 ;
      this.signupForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(('^[0-9]+$'))]],

        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])(?=.*[a-zA-Z0-9!@#$%^&*]).{15,}$/)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])(?=.*[a-zA-Z0-9!@#$%^&*]).{15,}$/), this.validateEqual('password')]],
        passwordHint: ['', Validators.required]

      });
    }


    // #userForm="ngForm"
  }
  validateEqual(controlName: string) {
    return (control: FormControl) => {
      const passwordControl = control.root.get(controlName);
      if (passwordControl && control.value !== passwordControl.value) {
        return { validateEqual: true };
      }
      return null;
    };
  }

  closeDialog() {
    this.dialogRef.close(undefined);
  }

  // getProgressValue(): number {
  //   const totalFields = 6; // Assuming you have 6 form fields, adjust as needed
  //   const completedFields = Object.values(this.signupForm.controls).filter(
  //     (control) => (control as AbstractControl).valid
  //   ).length;
  //   return (completedFields / totalFields) * 100;
  // }
  saveUser() {
    
    let user: Detail = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      phone: this.signupForm.value.phone,
      password: this.signupForm.value.password,
      passwordHint: this.signupForm.value.passwordHint
    };
    //  alert(JSON.stringify(user));
    // if(this.data.flag){
    //   alert(this.data.userData.password+" "+this.signupForm.value.oldPassword);
    // }
    let old:string = this.signupForm.value.oldPassword;
    
    if ((this.data.flag && this.data.userData.password === old) || (!this.data.flag)) {
      //  alert("Edit 1");
      if (user.username != '' && user.email != '' && user.phone != 0 && user.password != '' && user.passwordHint != ''){
        // alert("edit 2")
        // user.username != ''
        this.dialogRef.close(user);
      }
      else
       this.dialogRef.close(undefined);
    }
    else {
      this.dialogRef.close(undefined);
    }
    let name:string = this.signupForm.value.username;
    if((this.data.flag && this.data.userData.username===name)){
      if(user.username){}
    }
  }

  progress(): number {
       
     const filledFields = Object.values(this.signupForm.controls).filter(
      (control) => (control as AbstractControl).valid
    ).length;
    return (filledFields / this.totalFields) * 100;
  }
  }
