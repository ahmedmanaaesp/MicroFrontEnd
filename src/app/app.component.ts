import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employe } from './employe';
import { EmployeService } from './employe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RessourceHumaine';

  public employees: Employe[];
  public editEmployee: Employe;
  public deleteEmployee: Employe;

  constructor(private employeeService: EmployeService){}

  ngOnInit()  {
    this.getEmploye();
  }

  public getEmploye(): void {
    this.employeeService.getEmploye().subscribe(
      (response: Employe[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmloye(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeeService.AddEmploye(addForm.value).subscribe(
      (response: Employe) => {
        console.log(response);
        this.getEmploye();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employe): void {
    this.employeeService.UpdateEmploye(employee).subscribe(
      (response: Employe) => {
        console.log(response);
        this.getEmploye();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.DeleteEmploye(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmploye();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployes(key: string): void {
    console.log(key);
    const results: Employe[] = [];
    for (const employe of this.employees) {
      if (employe.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employe.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employe.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employe.matricule.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employe);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmploye();
    }
  }

  public onOpenModal(employe: Employe, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employe;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employe;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }


}
