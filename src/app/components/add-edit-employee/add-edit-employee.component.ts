import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Employee} from "../../models/employee";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../services/employee.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  employeeForm = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    age: [0, [Validators.required]],
    address: ['', [Validators.required]],
    country: ['', [Validators.required]]
  });

  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditEmployeeComponent>
  ) {
    if (data && data.employee) {
      this.employeeForm.patchValue({
        id: data.employee.id,
        age: data.employee.age,
        name: data.employee.name,
        address: data.employee.address,
        country: data.employee.country
      });
      this.isEdit = true;
    }
  }

  ngOnInit(): void {
  }


  save() {
    if (this.employeeForm.invalid) return;
    if (this.isEdit) {
      // @ts-ignore
      this.employeeService.editEmployee(this.employeeForm.controls['id'].value, this.employeeForm.value).subscribe(
        () => {
          this.dialogRef.close(true);
        }, () => {
          this.dialogRef.close(false);
        }
      )
    } else {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(
        () => {
          this.dialogRef.close(true);
        }, () => {
          this.dialogRef.close(false);
        }
      )
    }
  }
}
