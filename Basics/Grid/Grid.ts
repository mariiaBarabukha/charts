namespace Grid{
    
    export abstract class Grid{

        context: CanvasRenderingContext2D = Models.Model.getContext();
        length_x:number;
        length_y:number;
        intervals:number;
        start:Figures.Point;

       
        constructor(length_x:number,length_y:number,intervals:number,start:Figures.Point){
            
            this.length_x = length_x;
            this.length_y = length_y;
            this.intervals = intervals;
            this.start = start;
            console.log(this)
            console.log(this.start)
        }

        public abstract markeTheLines();
        

        draw(){
            context.save();
            context.beginPath();
            
            //don't forget to delete margin
            context.translate(this.start.x+Models.Model.margin, this.start.y-Models.Model.margin);
            context.strokeStyle = "black";
            context.lineWidth = Models.Model.def_lineWidth;
            this.markeTheLines();
            context.stroke();
            context.restore();
 
        }
        
    }
}