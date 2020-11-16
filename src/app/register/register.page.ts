import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form:FormGroup;

  constructor(private user:UserService) {
    this.form= new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email], this.Existeusuario.bind(this)),
      pass: new FormControl(null, [Validators.required, Validators.minLength(7)]),
      pass2: new FormControl(null,Validators.required),
      // condiciones: new FormControl(false,Validators.requiredTrue)
    }, { validators: this.sonIguales('pass', 'pass2') }
    );
   }

  ngOnInit() {
  }

  Existeusuario(control: AbstractControl) {

    return this.user.checkEmail(control.value).pipe( map((resp: any) => {
      return resp.email ? null : { emailTaken: true };
    }));

  }
  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  registrar(){
    console.log(this.form.value);
  }



}
