import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {  
  userList: any;
  userForm: FormGroup;
  ProfileImage: any;
  imageUrl: any;
  userUpdateId: any;

  constructor(private userserv: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      FirstName: [''],
      LastName: [''],
      Email: [''],
      Phone: [''],
      ProfileImage: File,
    });
  }
  ngOnInit() {
   
    this.getuser();
  }

  uploadFile(event:any) {
    this.ProfileImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.imageUrl = reader.result);
    reader.readAsDataURL(this.ProfileImage);
  }
  getuser() {
    this.userserv.getUser().subscribe(
      (res) => {
        this.userList = res.data;
      },
      (err) => {
        throw err;
      }
    );
  }
  onSubmit() {
    if (this.userUpdateId) {
      this.userserv
        .updateUser(this.userForm.value, this.ProfileImage, this.userUpdateId)
        .subscribe(
          (res) => {
            this.afterSubmit();
            alert('user upadted');
            this.getuser();
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.userserv
        .createUser(this.userForm.value, this.ProfileImage)
        .subscribe(
          (res) => {
            if(res.status=='success'){
              this.afterSubmit();
              this.getuser();
            }
           else{
            alert(res.message)
           }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  afterSubmit() {
    this.userForm.reset();
    this.userUpdateId = '';
    this.imageUrl = '';
  }
  onEdit(user: any) {
    this.userUpdateId = user._id;
    this.userForm.patchValue({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Phone: user.Phone,
    });
    this.imageUrl = 'http://localhost:8000/uploads/' + user.ProfileImage;
  }

  onDelete(userId: any) {
    this.userserv.deleteuser(userId).subscribe(
      (res) => {
        alert('User Deleted');
        this.getuser();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
