import { Component, OnInit, PipeTransform, Pipe ,ViewChild} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import {IonRangeSliderComponent} from "ng2-ion-range-slider";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('sliderElement') sliderElement: IonRangeSliderComponent;

  relevant_form : boolean;
  F:boolean=false;
  M:boolean=false;
  BOTH:boolean=false;
  min_exposure: number =1;
  max_exposure: number =100;

  objectKeys = Object.keys;
  search_form = {};
  table_info = {}

  organs = [];
  observations = [];
  species = [];
  sex = [];
  routes = [];

  constructor(private httpClient: HttpClient, private findService : FindingsService) {}

  ngOnInit(){ 
    
    this.findService.currentSearch.subscribe (search_form => this.search_form = search_form);
    this.findService.changeSearch(this.search_form);
    this.findService.searchFinding(this.search_form,1).subscribe(table_info => {this.table_info = table_info;
                                                                  this.findService.changeTable(this.table_info);
                                                                  });
    this.showOrgans();
    this.showObservations();
    this.showSpecies();
    this.showRoutes();
    this.showSex();
  }

  showOrgans(): void {
    this.findService.getOrgans()
      .subscribe(res => this.organs = res['organs']);
  }

  showObservations(): void {
    this.findService.getObservations()
      .subscribe(res => this.observations = res['observations']);
  }

  showSpecies(): void {
    this.findService.getSpecies()
      .subscribe(res => this.species = res['species']);
  }

  showRoutes(): void {
    this.findService.getRoutes()
      .subscribe(res => this.routes = res['route']);
  }

  showSex(): void {
    this.findService.getSex()
      .subscribe(res => this.sex = res['sex']);
  }

  addSearchSelect(event: any){
      // If the key(field of search) is already inserted   
      if (event.target.id in this.search_form){
        // If the value(name to search) is already inserted
        if (event.target.id == "sex"){
          this.search_form[event.target.id].pop()
        }
        if (this.search_form[event.target.id].indexOf(event.target.value)==-1){   
          this.search_form[event.target.id].push(event.target.value);
        }
      }
      else{
        this.search_form[event.target.id]=[event.target.value];
      }
      this.findService.changeSearch(this.search_form);
      this.findService.searchFinding(this.search_form,1).subscribe(table_info => {this.table_info = table_info;
                                                                  this.findService.changeTable(this.table_info);
                                                                  });
  } 

  addSearchText(event: any){

    if (event.key=="Enter"){ 
      if (event.target.id in this.search_form){
        // If the value(name to search) is already inserted
        this.search_form[event.target.id].pop();  
        this.search_form[event.target.id].push(event.target.value);
      }
      else{
        this.search_form[event.target.id]=[event.target.value];
      }

    }
    this.findService.changeSearch(this.search_form);
    this.findService.searchFinding(this.search_form,1).subscribe(table_info => {this.table_info = table_info;
                                                                this.findService.changeTable(this.table_info);
                                                                });
  }

  addSearchCheckBox(event: any){
 
    if (this.sex.indexOf(event.target.value)!=-1){  
      if (event.target.checked){
          if (event.target.value=="F"){
            this.M=false;
            this.BOTH=false;
          }
          else if (event.target.value=="M"){
            this.F=false;
            this.BOTH=false;
          }
          else{
            this.M=false;
            this.F=false;
          }
      }
    }
    if (event.target.checked){   
      this.search_form[event.target.id]=[event.target.value];   
    }
    else{   
      delete this.search_form[event.target.id];
    }
    this.findService.changeSearch(this.search_form);
    this.findService.searchFinding(this.search_form,1).subscribe(table_info => {this.table_info = table_info;
      this.findService.changeTable(this.table_info);
      });

  }
  addSliderInfo($event){

    delete this.search_form['min_exposure'];
    delete this.search_form['max_exposure'];
    if (this.min_exposure!=$event.from){
      this.search_form['min_exposure']=$event.from;
    }
    if (this.max_exposure!=$event.to){
      this.search_form['max_exposure']=$event.to;
    }
    this.findService.changeSearch(this.search_form);
    this.findService.searchFinding(this.search_form,1).subscribe(table_info => {this.table_info = table_info;
      this.findService.changeTable(this.table_info);
      });
  }

  resetFilters(){

  
   
 
    
    this.search_form={}
    this.BOTH = false;
    this.F = false;
    this.M = false;
    this.sliderElement.reset();
    this.relevant_form = false;
    this.findService.changeSearch(this.search_form);
    this.findService.searchFinding(this.search_form,1).subscribe(table_info => {this.table_info = table_info;
      this.findService.changeTable(this.table_info);
      });

  }
}
