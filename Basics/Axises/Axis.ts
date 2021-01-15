namespace Axises{

    
    export abstract class Axis{
        length:number;
        maxVal:number;
        minVal:number;
              
        

        startPoint: Figures.Point = new Figures.Point(0, Models.Model.canvas.height);
        finishPoint:Figures.Point;

        context: CanvasRenderingContext2D = Models.Model.getContext();
        constructor(length: number, maxVal: number, minVal: number = 0){
            this.length = length;
            this.maxVal = maxVal;
            this.minVal = minVal;
        }

        public setMargin(m:number){
            Models.Model.margin = m;
        }

        public setStartCoordinate(s:Figures.Point){
            this.startPoint.x = s.x;
            this.startPoint.y = s.y;
        }

        protected abstract calculateFinishPoint():Figures.Point;

        addToCanvas(){      
            console.log(this.length);
            this.finishPoint = this.calculateFinishPoint();
            let a: Figures.Arrow = new Figures.Arrow(this.startPoint, this.finishPoint, 
            new Figures.ArrowHeads.SimpleArrowHead(this.finishPoint, Models.Model.def_arrowHeadWidth, Models.Model.def_arrowHeadHeight));
            
        }
    }
}