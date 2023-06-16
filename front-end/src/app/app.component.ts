import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'M01';
  userForm : FormGroup;

  ngOnInit()
{
this.userForm = new FormGroup({
username : new FormControl(),
email : new FormControl()
});
}

}
