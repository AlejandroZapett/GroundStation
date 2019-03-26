import { Component, OnInit, ViewChild } from '@angular/core';
//Ng charts dependencies 
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { GsFileSystemService } from '../../../services/gs-file-system-service/gs-file-system-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GsParseService } from '../../../services/gs-parse-service/gs-parse-service';
import { tick } from '@angular/core/src/render3';

@Component({
  selector: 'app-gs-graph-data-component',
  templateUrl: './gs-graph-data-component.component.html',
  styleUrls: ['./gs-graph-data-component.component.scss']
})
export class GsGraphDataComponentComponent implements OnInit {

  //====================
  //Production variables
  public isFileSelected:boolean = false;
  public files:Array<any> = [];
  public LocalFlightData:Array<any> = [];
  //====================

  //==================================================================
  //=========================Chart Variables==========================
  //Pressure Chart
  public lineChartDataPressure: ChartDataSets[] = [
    { data: [], label: 'Pressure' }
  ]; //variable
  public lineChartColorsPressure: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  //Temperature Chart
  public lineChartDataTemp: ChartDataSets[] = [
    { data: [], label: 'Temperature'}
  ];
  public lineChartColorsTemp: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  //Altitude Chart
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

  constructor(
    public fs: GsFileSystemService,
    private modalService: NgbModal,
    private parseService: GsParseService
  ) {}

  ngOnInit() {}

  //============ Chart events methods ================ 
  //==================================================
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  //==================================================

  //============= Files System Methods================
  //==================================================
  public getFiles(content){
    //This Method returns the content in the Flight
    //Files folder.
    this.fs.getFiles().then( files => {
      this.files = files;
      //We open a model service with the file options.
      this.modalService.open(content);
    });
  }

  public getFileContent(file){
    //This method return the content of file
    //previusly selected.
    this.fs.getFileContent(file).then(content => {
      this.parseService.parseLocalFile(content).then( fd => {
        this.LocalFlightData = fd;
        this.setGraphsData();
        this.isFileSelected = true;
      });
    });
  }
  //==================================================

  //============ Set Flight Graphs Methods ===========
  //==================================================
  public setGraphsData(){

    var altitudeData = [];
    var pressureData = [];
    var temperatureData = [];
    var labels = [];

    this.LocalFlightData.forEach(item => {
      labels.push(item.id);
      altitudeData.push(item.content.altitude);
      pressureData.push(item.content.pressure);
      temperatureData.push(item.content.temperature);
    });

    this.setAltitudeData(altitudeData);
    this.setTemperatureData(temperatureData);
    this.setPressureData(pressureData);
    this.setLabels(labels);
    
  }

  public setPressureData(values){
    this.lineChartDataPressure[0].data = values;
  }

  public setTemperatureData(values){
    this.lineChartDataTemp[0].data = values;
  }

  public setAltitudeData(values){
    this.lineChartDataAltitude[0].data = values;
  }

  public setLabels(labels){
    this.lineCommonChartLabels = labels;
    console.log(labels);
  }
  //==================================================

  //=============== Reset View Methods ===============
  //==================================================
  public newFile(){
    this.isFileSelected = false;
    //Reset Graph Values
    this.setLabels([]);
    this.setAltitudeData([]);
    this.setTemperatureData([]);
    this.setPressureData([]);
    //Reset Global Values
    this.files = [];
    this.LocalFlightData = [];
  }
  //==================================================

}
