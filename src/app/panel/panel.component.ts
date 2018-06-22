import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FindingsService } from '../findings.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  objectKeys = Object.keys;
  @Input() searchFormPanel = {};
  @Input() CategorySearchFormPanel = {};
  @Input() key:string;
  @Input() category:string;
  @Output() relevantClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private findService : FindingsService) { }

  ngOnInit() {
    this.findService.currentTable.subscribe ();
  }  

  removeThis(key:string, value:string, category:string){
    if (category===undefined) {
      this.searchFormPanel[key].splice(value, 1);
      if (this.searchFormPanel[key].length==0){
        delete this.searchFormPanel[key];
      }
    } else {
      this.CategorySearchFormPanel[category][key].splice(value, 1);
      if (this.CategorySearchFormPanel[category][key].length==0){
        delete this.CategorySearchFormPanel[category][key];
        if (Object.keys(this.CategorySearchFormPanel[category]).length==0) {
          this.CategorySearchFormPanel[category] = null;
        }
      }
    }
    
    this.findService.searchFinding(this.searchFormPanel,this.CategorySearchFormPanel,1).subscribe(table_info => this.findService.changeTable(table_info));
  }
}