import { Component, OnInit, Input,ViewChildren,QueryList,ElementRef,AfterViewInit ,ViewContainerRef, Renderer2} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';
import * as SmilesDrawer from 'smiles-drawer';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { CustomModalComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,AfterViewInit {

  table_info = {};
  @Input() searchFormTable = {};
  @ViewChildren('cmp') components:QueryList<ElementRef>;
  

  constructor(private findService : FindingsService, private modalDialogService: ModalDialogService, private viewContainer: ViewContainerRef,
              private renderer: Renderer2) {}

  ngOnInit() {
    this.findService.currentTable.subscribe (table_info => this.table_info = table_info);
  }

  openCustomModal(id:string) {

    this.modalDialogService.openDialog(this.viewContainer, {
      title: 'Study Information',
      childComponent: CustomModalComponent,
      settings: {
        closeButtonClass: 'close theme-icon-close',
        modalDialogClass: "modal-dialog modal-dialog-centered modal-lg"
      },
      data: id
    });
  }

  ngAfterViewInit() {

    this.components.changes.subscribe((component) => { 
      
      if (this.components !== undefined){
        this.components.forEach((child) => { 
         
          let options = {'width':75, 'height':50};
          let smilesDrawer = new SmilesDrawer.Drawer(options);
          SmilesDrawer.parse(child.nativeElement.textContent, function (tree) {
            smilesDrawer.draw(tree,child.nativeElement.id, 'light', false);
            }, function (err) {
              console.log(err);
            });
            this.renderer.listen( child.nativeElement, 'click', () => {this.openCustomModal("aux");});
        });
      }
    });

  }
  // Page(page:number){
  //   this.findService.searchFinding(this.searchFormTable,page).subscribe(res => this.table_info = res); 
  // }

 

}
