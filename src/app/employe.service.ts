import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { Employe } from "./employe";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
providedIn: 'root'
})

export class EmployeService {
    private apiServerUrl ='' ;
    constructor (private http: HttpClient) {}

    public getEmploye(): Observable<Employe[]> {
        return this.http.get<Employe[]>('${this.apiServerUrl}/employe/all');
    }

    public AddEmploye(employe: Employe): Observable<Employe> {
        return this.http.post<Employe>('${this.apiServerUrl}',employe);
    }

    public UpdateEmploye(employe: Employe): Observable<Employe> {
        return this.http.put<Employe>('${this.apiServerUrl}',employe);
    }

    public DeleteEmploye(employeId: number): Observable<void> {
        return this.http.delete<void>('${this.apiServerUrl}/${id}');
    }

}