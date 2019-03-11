export class TelemetryData {

    public list:Array<any> = [];
    //Las propiedades de este objeto son un array de json que contiene
    //la información en cada instante de un vuelo
    constructor(){}

    public setData(data){
        this.list.push(data);
    }
    public getData(){
        return this.list;
    }

}