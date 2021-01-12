namespace Grid{
    
    export class HorizontalGrid{

        context: CanvasRenderingContext2D = Models.Model.getContext();
        length_x:number;
        length_y:number;
        intervals:number;
        start:Figures.Point;

       
        constructor(length_x:number,length_y:number,intervals:number,start:Figures.Point){
            console.log("aaaaaaaaaa")
            this.length_x = length_x;
            this.length_y = length_y;
            this.intervals = intervals;
            this.start = start;
        }

        draw(){
            context.save();
            context.beginPath();
            context.translate(this.start.x, this.start.y);
            for(let i:number = this.intervals; i<(this.length_y-this.intervals);i+=this.intervals){
                context.moveTo(0,i);
                context.lineTo(this.length_x,i);
                context.strokeStyle = "blue";
                context.lineWidth = Models.Model.def_lineWidth;
                context.stroke();
            }
            
            
            context.restore();
        }
        

    }
}