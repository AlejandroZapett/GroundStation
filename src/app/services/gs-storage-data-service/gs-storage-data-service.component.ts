import { OnInit, Injectable } from '@angular/core';
import { TelemetryData } from '../../models/telemetry-data';

@Injectable()
export class GsStorageDataService {

    public TData = {};

    constructor(){}

    public storageTelemtryData(FNumber:string, obj:TelemetryData){
        this.TData[FNumber] = obj;
    }

    public getTelemetryData(FNumber:string){
        return this.TData[FNumber];
    }

}