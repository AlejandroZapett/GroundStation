import { Component, OnInit, Injectable } from '@angular/core';
import { GsConnectionSerialService } from './gs-connection-serial-service';
import * as Serialport from 'serialport';

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

@Injectable()
export class GsConnectionServiceComponent implements OnInit {

  public table: TableData;
  public port: any;
  //public parser: any;
  public selectedPortId: string;
  public command: string = '';
  public CR = '\r';
  public readBuffer = '';
  public readBufferLength = 58;
  public portOpts = { 
  };
  public screen: string = '[LOG] Open port not found';

  constructor(
    public serialService: GsConnectionSerialService,
  ) { }

  ngOnInit() {
    this.table = {
      headerRow: ['#', 'COM name', 'Manuf.', 'Vendor ID', 'Product ID'],
      dataRows: [],
    };
  }

  public scan(){

    this.ngOnInit();
    let index = 1;
    let portDetails: any;
    this.table.dataRows = [];
    
    this.serialService.serialPort.list().then(ports => {
      ports.forEach(port => {

        portDetails = {
          id: index,
          comName:port.comName,
          manufacturer:port.manufacturer,
          vendorId:port.vendorId,
          productId:port.productId
        }
        
        this.table.dataRows.push(portDetails);
        index++;
      });
    });
    return this.table;
  }

  public closePort(){

    var portClosed = this.selectedPortId;
    this.port.close(err => {
      if(err){
        console.log(err.message);
      }
    });
    this.selectedPortId = '';
    this.port = null;

    return 'Port closed: '+ portClosed;
  }

  public openPort(portID, portOpts){

    this.selectedPortId = portID;
    this.portOpts = portOpts
  
    this.port = new this.serialService.serialPort(
      this.selectedPortId,
      this.portOpts,
      err => {
        if (err) {
          this.screen = '[ERR] Error opening port: ' + err.message;
          return console.log('Error opening port: ', err.message);
        }
      }
    );
    return this.port;
  }

  public setParser(port){
    return port.pipe(new this.serialService.serialPort.parsers.Readline({ delimeter:'\r\n'}));
  }

  public send(message){

    this.command = message.toString();
    let buf = new Buffer(this.command + this.CR, 'ascii'); // append CR

    this.port.write(buf, err => {
      if (err) {
        return err.message;
      }
    });

    return message;

  }

  str2hex(str: string): Buffer {
    let arr = [];
    for (let i = 0, l = str.length; i < l; i++) {
      let ascii = str.charCodeAt(i);
      arr.push(ascii);
    }
    arr.push(255);
    arr.push(255);
    arr.push(255);
    return new Buffer(arr);
  }

  hex2ascii(hexString) {
    let hex = hexString.toString(); //force conversion
    let str = '';
    for (let i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  public Debug(){
    console.log("from connection service");
  }

}
