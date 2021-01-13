namespace Grid{
    export class CombinedGrid extends Grid{

        constructor(length_x:number,length_y:number,start:Figures.Point,intervals:number,intervals2:number){
            console.log(intervals,intervals2);
            super(length_x,length_y,start,intervals,intervals2);
        }

        markeTheLines(){
            for(let i:number = -this.length_y+this.intervals1; i<0; i+=this.intervals1){
                
                context.moveTo(0,i);
                context.lineTo(this.length_x,i);
              
            }
            for(let i:number = this.intervals2; i<= this.length_x - this.intervals2; i+=this.intervals2){
                
                context.moveTo(i,0);
                context.lineTo(i,-this.length_y);
              
            }
        }


    }
}