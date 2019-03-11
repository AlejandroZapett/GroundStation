import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
    providedIn: "root"
})
export class GsFileSystemService {
    private ipc: IpcRenderer;

    constructor(){
        if ((<any>window).require) {
            try {
                this.ipc = (<any>window).require("electron").ipcRenderer;
            } catch (error) {
                throw error;
            }
            } else {
            console.warn("Could not load electron ipc");
        }
    }


    async getFiles() {
        return new Promise<string[]>((resolve, reject) => {
          this.ipc.once("getFilesResponse", (event, arg) => {
            resolve(arg);
          });
          this.ipc.send("getFiles");
        });
    }

    async getFileContent(fileName) {
        return new Promise<String[]>((resolve, reject) => {
            this.ipc.once("getFileContentResponse", (event, arg) => {
                resolve(arg);
            });
            this.ipc.send("getFileContent", fileName);
        });
    }
}