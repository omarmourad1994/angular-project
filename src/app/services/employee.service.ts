import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    const apiUrl = environment.apiUrl + `employee`;
    return this.http.get<Employee[]>(apiUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    const apiUrl = environment.apiUrl + `employee/${id}`;
    return this.http.get<Employee>(apiUrl);
  }

  createEmployee(data: any): Observable<any> {
    const apiUrl = environment.apiUrl + `employee`;
    return this.http.post<Employee>(apiUrl, data);
  }

  editEmployee(id: number, data: any): Observable<any> {
    const apiUrl = environment.apiUrl + `employee/${id}`;
    return this.http.put<Employee>(apiUrl, data);
  }

  deleteEmployee(id: number): Observable<any> {
    const apiUrl = environment.apiUrl + `employee/${id}`;
    return this.http.delete<any>(apiUrl);
  }
}
