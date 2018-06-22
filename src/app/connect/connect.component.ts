import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FindingsService } from '../findings.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  host: string;
  port: number=1521;
  sid: string;
  user: string;
  password: string;

  connectionStatus: string="No connected";

  constructor(private httpClient: HttpClient, private findService : FindingsService) {}

  ngOnInit() {
  }

  checkConnection(){
    if (this.host && this.port && this.sid && this.user && this.password) {
      // this.findService.searchFinding(this.search_form,1).subscribe(table_info => this.findService.changeTable(table_info));
      this.connectionStatus = "Connecting...";
    }
    else {
      this.connectionStatus = "Missing data!";
    }
  }
}
