import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FindingsService {

  /*private search_form = new BehaviorSubject<any>({});
  currentSearch = this.search_form.asObservable();*/

  private table_form = new BehaviorSubject<any>({});
  currentTable = this.table_form.asObservable();

  apiRoot = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  changeTable(table){
    this.table_form.next(table);
  }
  
  initFinding(): Observable<any>{
    let url: string = this.apiRoot+"/initFindings";
    let params = new HttpParams();
    params = params.set('page','1')
    return this.http.get(url, {params: params})    
  }

  searchFinding(search_filter,page): Observable<any>{
    let url: string = this.apiRoot+"/findings";
    let params = new HttpParams({ fromObject: search_filter });
    params = params.set('page',page.toString());
    return this.http.get(url, {params: params})
  }

  getStudy(study_id): Observable<any>{
    let params = new HttpParams();
    params = params.set('id',study_id.toString())
    return this.http.get(this.apiRoot+'/study', {params: params})
  }
}