import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../user.service';
import { Detail } from '../detail';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email','phone', 'actions'];
  dataSource = new MatTableDataSource<Detail>();
  @ViewChild(MatTable) table: any;
  filterString: string = '';

  constructor(private dialog: MatDialog, private userService: UserService) { }


  ngOnInit() {
    this.dataSource.data = this.userService.getUsers();
  }

  openAddUserDialog() {
    let dialogRef = this.dialog.open(AddUserComponent, {
      width: '800px',
      data: {userData:null, flag:false,title:'Add User'},
      
    });

    dialogRef.afterClosed().subscribe(result => {
      // alert("In close of Add " + JSON.stringify(result));
      if (result) {
        // alert(JSON.stringify(result));
        this.userService.addUser(result);
        this.dataSource.data = this.userService.getUsers();
        this.table.renderRows();
      }

    });
  }

  editUser(user: any) {
    
          let dialogRef = this.dialog.open(AddUserComponent, {
            width: '800px', height: '700',
          data: {userData:user, flag:true,title:'Update User'},
          });
          dialogRef.afterClosed().subscribe(result => {
              // alert('after edit'+ JSON.stringify(result));
            if (result) {
              //  alert('after edit'+ JSON.stringify(result));
              this.userService.updateUser(user,result);
              this.dataSource.data = this.userService.getUsers();
              this.table.renderRows();
            }
          });
        
        

    
  }



  deleteUser(user: any) {
    // alert("On Delete " + JSON.stringify(user));
    this.userService.deleteUser(user);
    this.dataSource.data = this.userService.getUsers();
    this.table.renderRows();
  }


 
}



