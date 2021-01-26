namespace Grid{

    export enum Grids{
        Horizontal,
        Vertical,
        Combined,
        None
    }
    
    export abstract class Grid{

        context: CanvasRenderingContext2D = Models.Model.getContext();
        length_x:number;
        length_y:number;
        intervals1:number;
        intervals2:number;
        start:Figures.Point;

       
        constructor(length_x:number,length_y:number,start:Figures.Point,intervals1:number,intervals2:number = 0){
            
            this.length_x = length_x;
            this.length_y = length_y;
            this.intervals1 = intervals1;
            this.intervals2 = intervals2;
            this.start = start;
           // console.log(this)
            //console.log(this.start)
        }



        lineWidth:number;
        public abstract markeTheLines();

        public setGridLineWidth(w:number){
            this.lineWidth = w;
        }
        

        draw(){
            context.save();
            context.beginPath();
            
            //don't forget to delete margin
            context.translate(this.start.x, this.start.y);
            context.strokeStyle = "black";
            context.lineWidth = this.lineWidth;
            this.markeTheLines();
            context.stroke();
            context.restore();
 
        }
        
    }
}