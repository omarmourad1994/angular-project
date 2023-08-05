import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/employee";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEditEmployeeComponent} from "../add-edit-employee/add-edit-employee.component";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  showConfirmationDialog = false;
  employeeToBeDeleted: Employee | undefined;

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employees = res;
      }, error => {
        console.log(error);
      }
    )
  }

  addEmployee() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    const dialogRef = this.dialog.open(AddEditEmployeeComponent);
    dialogRef.afterClosed().subscribe(async dialogResult => {
      if (dialogResult) {
        this.getEmployees();
      }
    });
  }

  editEmployee(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      data: {employee: employee},
    });
    dialogRef.afterClosed().subscribe(async dialogResult => {
      if (dialogResult) {
        this.getEmployees();
      }
    });
  }

  confirmDelete(employee: Employee) {
    this.employeeToBeDeleted = employee;
    this.showConfirmationDialog = true;
  }

  hideConfirmationDialog() {
    this.showConfirmationDialog = false;
    this.employeeToBeDeleted = undefined;
  }

  deleteEmployee() {
    // @ts-ignore
    this.employeeService.deleteEmployee(this.employeeToBeDeleted.id).subscribe(
      () => {
        console.log("Deleted successfully");
        this.getEmployees();
      }, error => {
        console.log(error);
      }
    )
    this.hideConfirmationDialog();
  }

}
