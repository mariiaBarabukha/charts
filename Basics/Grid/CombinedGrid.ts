namespace Grid{
    export class CombinedGrid extends Grid{

        constructor(length_x:number,length_y:number,intervals:number,start:Figures.Point){
            super(length_x,length_y,intervals,start);
        }

        markeTheLines(){
            for(let i:number = -this.length_y+this.intervals; i<0; i+=this.intervals){
                
                context.moveTo(0,i);
                context.lineTo(this.length_x,i);
              
            }
            for(let i:number = this.intervals; i<= this.length_x - this.intervals; i+=this.intervals){
                
                context.moveTo(i,0);
                context.lineTo(i,-this.length_y);
              
            }
        }


    }
}