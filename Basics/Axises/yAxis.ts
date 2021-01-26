namespace Axises{
    export class YAxis extends Axis{
       
        constructor(length: number, maxVal: number, minVal: number = 0){
            super(length,maxVal,minVal);
        }       

        calculateFinishPoint():Figures.Point{
            return new Figures.Point(this.startPoint.x, this.startPoint.y-this.length);
        }
        public addAxisName(){
            context.font ="10px serif";
            //context.fillText("y",this.startPoint.x-10,this.startPoint.y-this.length+10);
            context.strokeText("y",this.startPoint.x-10,this.startPoint.y-this.length+10);
            

        }
        public addLabel(){
            context.save();
            context.font = "20px serif";
            context.translate(this.startPoint.x,this.startPoint.y);
            context.rotate(Math.PI / 2);
            context.textAlign = "center";
            //context.rotate(Math.PI/2);
          
            context.fillText(ChartData.Data.description["y"],-this.length/2,17);
            console.log(this.startPoint.x-10,this.startPoint.y-this.length/2);

            context.restore();
        }     
    }
}