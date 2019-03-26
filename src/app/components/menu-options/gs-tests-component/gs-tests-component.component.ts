import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { GsConnectionServiceComponent } from '../../../services/gs-connection-service/gs-connection-service.component';
import { GsStorageDataService } from '../../../services/gs-storage-data-service/gs-storage-data-service.component';
import { TelemetryData } from '../../../models/telemetry-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare interface dataRow {
  id?: number;
  comName?: string;
  manufacturer?: string;
  vendorId?: string;  
  productId?: string;
}

declare interface TableData {
  headerRow: string[];
  dataRows: dataRow[];
}

@Component({
  selector: 'app-gs-tests-component',
  templateUrl: './gs-tests-component.component.html',
  styleUrls: ['./gs-tests-component.component.scss']
})
export class GsTestsComponentComponent implements OnInit, OnDestroy {

  //====================
  //Production variables
  public tableData: TableData; //an array with the number of ports and their specs
  public portOpts:any = { baudRate: 9600, autoOpen: false }; //serial port opts
  public portID:string = ""; //id of the serial we want to connect
  public portConnection; //connection object
  public parser; //connection object with the parser config
  public isPortSelected:boolean = false;
  private intervalHolder:any; 
  public isConnection:boolean = false;
  public lastTime:number = 0;
  public timeRecord;
  public fifoLog:Array<string> = [];//implement its functionality <===
  public screen:any; //The last message recived
  //====================
  
  //===============
  //Debug variables
  //===============

  constructor(
    private connection: GsConnectionServiceComponent,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal
  ) { 
    this.timeRecord = Date.now();
    //===================================================
    //To display live data, we configure a chage detector.
    ref.detach();
    this.intervalHolder = setInterval(() => { 
      this.ref.detectChanges();
      this.setTime(); 
    }, 1000);
    //===================================================
  }

  ngOnInit() {
    //========================================
    //Variables needed to get the serial ports.
    this.tableData = {
      headerRow: ['#', 'COM name', 'Manuf.', 'Vendor ID', 'Product ID'],
      dataRows: [], 
    };
    //========================================
  }

  ngOnDestroy(){
    //==============================
    //Clearing the component process
    console.log("on destroy");
    if(this.parser != null){
      this.closeConnection();
    }
    clearInterval(this.intervalHolder);
     //==============================
  }

  public scanPorts(content){
    //It opens a modal service
    this.modalService.open(content);
    //===================================================
    //To establish the connection, the ports are scanned 
    //for devices.
    this.tableData = this.connection.scan(); //implement a filter <----------
    console.log(this.tableData);
    //===================================================
  }

  public setPortID(id){
    //===================================================
    //To establish the connection, we send from the view
    //the port id to which we wnat to connect.
    this.portID = id;
    //We set the connections under the established
    //parameters.
    this.setConnection();
    //We set the condition of the log area to true
    this.isPortSelected = true;
    //===================================================
  }

  public setConnection(){
    //=======================================================
    //To establish the connection, we set a connection object
    //that allows us to handle the serial port events
    this.portConnection = this.connection.openPort(this.portID, this.portOpts);

    this.portConnection.open(err => {
      if (err) {
        this.screen = '[ERR] Error opening port: ' + this.portID;
      } else {
        this.isConnection = true;
      }
    });

    this.parser = this.connection.setParser(this.portConnection);
    
    this.parser.on('open', () => {
      this.screen = '[LOG] Port opened: ' + this.portID.toString();
      console.log(this.screen);
    });

    this.parser.on('data', data => {
      this.screen = data.toString();
      this.fifoLog.push(data);
      this.timeRecord = Date.now();
    });
    //=======================================================
  }

  public setTime(){
    var date = Date.now();
    this.lastTime = (date - this.timeRecord)/1000;
    if (this.lastTime > 5){
      this.isConnection = false;
    } else {
      this.isConnection = true;
    }
  }

  public closeConnection(){
    //=======================================================
    //To change port or choosing another menu option, we close
    //the connection with the current port, and ser the
    //variables to cero.
    var message = this.connection.closePort();
    this.setInitialConditions();
    //=======================================================
  }

  public sendTelemetryData(message){
    this.connection.send(message);
  }

  public setInitialConditions(){
    this.isPortSelected = false;
    this.portID = "";
    this.portConnection = null;
    this.parser = null;
    this.isConnection = false;
    this.screen = "";
  }

}
