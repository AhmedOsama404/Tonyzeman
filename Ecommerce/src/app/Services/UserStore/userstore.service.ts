import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstoreService {

  constructor() { }


  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");


  public getRoleFromStore(){ 
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullName:string){
    this.fullName$.next(fullName);
  }

  public getRoleForStore(role:string){
    this.role$.next(role);
  }
}
