//General Purpose dependencies
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GsConnectionServiceComponent } from '../../../services/gs-connection-service/gs-connection-service.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//Services
import { GsComputingDataServiceComponent } from '../../../services/gs-computing-data-service/gs-computing-data-service.component';
import { GsFileSystemService } from '../../../services/gs-file-system-service/gs-file-system-service';
import { GsParseService } from '../../../services/gs-parse-service/gs-parse-service';
//Ng charts dependencies 
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { tick } from '@angular/core/src/render3';

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
  selector: 'app-gs-flight-monitor-component',
  templateUrl: './gs-flight-monitor-component.component.html',
  styleUrls: ['./gs-flight-monitor-component.component.scss']
})
export class GsFlightMonitorComponentComponent implements OnInit {

  //Production variables
  public tableData: TableData; //an array with the number of ports and their specs
  public portOpts:any = { baudRate: 9600, autoOpen: false }; //serial port opts
  public portID:string = ""; //id of the serial we want to connect
  public portConnection; //connection object
  public parser; //connection object with the parser config
  public isPortSelected:boolean = false;
  private intervalHolder:any; 
  public timeRecord;
  public screen:any; //The last message recived
  public TelemetryMessages:Array<any> = [];
  public stage:string = "Pad"; //"Ascent, Descent, Landed"

  //Pad variables
  public altitude = 0;
  public temperature = 0;
  public pressure = 0;
  //Ascent variables
  public maxAVelocity = 0;
  public maxAacceleration = 0;
  public maxAPressure = 0;
  public minATemperature = 0;
  //Descent variables
  public maxDVelocity = 0;
  public maxDacceleration = 0;
  public maxDPressure = 0;
  public distanceGround = 0;
  //Land variables
  //Systemp variables
  public temperatureFC = 0;
  public batteryFC = 0;
  //Common variables
  public lastTime:number = 0;
  public position = 0;
  public isConnection:boolean = false;

  //Debug variables

  //==================================================================
  //=========================Chart Variables==========================
  //Altitude Chart
  public dataAltitude = [];
  public lineChartDataAltitude: ChartDataSets[] = [
    { data: [], label: 'Altitude', pointRadius: 0.5, borderWidth: 0.5 }
  ]; //variable
  public lineChartColorsAltitude: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  //Common chart properties
  public lineCommonChartLabels: Label[] = []; //variable
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks:{
            min:0,
          }
        }
      ]
    },
    annotation: { annotations: [{}]}
  };
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  //==================================================================

  constructor(
    private connection: GsConnectionServiceComponent,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
    private computingService:GsComputingDataServiceComponent,
    public fs: GsFileSystemService,
    private parseService: GsParseService
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
  //============== Connection methods ================ 
  //==================================================
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
      this.TelemetryMessages.push(data);
      this.parseService.parseLocalFile(data).then(content => {
        //implement a filter service
        this.updateTables(content);
        //update methods
        this.updateViewVariables(content);
      });
      
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
  //==================================================

  //============ Chart events methods ================ 
  //==================================================
  public updateTables(content){
    content.forEach(item => {
      this.dataAltitude.push(item.content.altitude);
      this.lineChartDataAltitude[0].data = this.dataAltitude;
      this.lineChartDataAltitude = [{ data: this.dataAltitude, label: 'Altitude', pointRadius: 0.5, borderWidth: 0.5 }];
      this.lineCommonChartLabels.push(item.id);
    });
    this.chart.update();
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  //==================================================

  //============= Update view methods ================ 
  //==================================================
  public updateViewVariables(content){
    content.forEach(item => {
      this.altitude = item.content.altitude;
    });
  }
  //==================================================

  //============= Files System Methods================
  //==================================================
  public saveTelemetryData(){}
  //==================================================
}
