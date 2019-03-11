import { OnInit, Injectable } from '@angular/core';
import * as Serialport from 'serialport';
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';


declare global {
    interface Window {
      require: any;
      process: any;
    }
  }

@Injectable()
export class GsConnectionSerialService {
    serialPort: typeof Serialport;

    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;
    remote: typeof remote;
    childProcess: typeof childProcess;
    fs: typeof fs;

    constructor(){
        if (this.isElectron()) {
            this.serialPort = window.require('serialport');

            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.webFrame = window.require('electron').webFrame;
            this.remote = window.require('electron').remote;

            this.childProcess = window.require('child_process');
            this.fs = window.require('fs');
        }
    }

    isElectron = () => {
        return window && window.process && window.process.type;
    };
}