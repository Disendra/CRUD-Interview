import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { EditTableComponent } from '../edit-table/edit-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  displayedColumns: string[] = ['Id', 'First Name', 'Last Name', 'Email', 'Contact', 'Action'];
  userDetails!: MatTableDataSource<Element>

  constructor(
    public dialog: MatDialog,
    public dataService: DataService,
  ) { }

  ngOnInit(): void {
  }

  private getUsers() {
    this.userDetails = new MatTableDataSource<Element>(this.dataService.getUser());
  }

  public openPopup() {
    const dialogRef = this.dialog.open(EditTableComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  public editUser(index: any, data: any) {
    data.id = index;
    data.action = 'edit';
    const dialogRef = this.dialog.open(EditTableComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  public deleteUser(index: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.dataService.deleteUser(index);
      this.getUsers();
    }
  }

}
