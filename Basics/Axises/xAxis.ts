namespace Axises{
    export class XAxis extends Axis{
       
        constructor(length: number, maxVal: number, minVal: number = 0){
            super(length,maxVal,minVal);
        }       

        calculateFinishPoint():Figures.Point{
            return new Figures.Point(this.startPoint.x+this.length, this.startPoint.y);
        }
        
        public addAxisName(){
            context.font ="10px serif";
            context.strokeText("x",this.startPoint.x+this.length-10,this.startPoint.y+10);

        }

        public addLabel(){
            context.save();
            context.font = "20px serif";
            context.textAlign = "center";
            console.log(ChartData.Data.description);
            context.fillText(ChartData.Data.description["x"],this.startPoint.x+this.length/2,this.startPoint.y+21);
            context.restore();
        }
    }
}