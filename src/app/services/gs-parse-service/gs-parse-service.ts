import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class GsParseService {

    constructor(){}

    public parseLocalFile(content){

        return new Promise<any>((resolve,reject) => {

            var flightContent = [];
            var auxContent = content.split("\n");

            auxContent.forEach(function(item){
                if (item != "") {

                    var auxRow = item.split(";");
                    var idContent = auxRow[1].split(",");

                    var json = {
                        id: auxRow[0],
                        content: {
                            pressure: idContent[0].split(":")[1],
                            altitude: idContent[1].split(":")[1],
                            temperature: idContent[2].split(":")[1]
                        }
                    }
                    flightContent.push(json);
                }
            });

            resolve(flightContent);
        
        });
    }
}