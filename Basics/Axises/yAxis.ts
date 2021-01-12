namespace Axises{
    export class YAxis extends Axis{
       
        constructor(length: number, maxVal: number, minVal: number = 0){
            super(length,maxVal,minVal);
        }       

        calculateFinishPoint():Figures.Point{
            return new Figures.Point(this.startPoint.x, this.startPoint.y-this.length);
        }       
    }
}