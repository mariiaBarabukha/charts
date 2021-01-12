namespace Grid{
    
    export class VerticalGrid extends Grid{
       
        constructor(length_x:number,length_y:number,intervals:number,start:Figures.Point){
            super(length_x,length_y,intervals,start);
        }

        public markeTheLines(){
            for(let i:number = this.intervals; i<= this.length_x - this.intervals; i+=this.intervals){
                
                context.moveTo(i,0);
                context.lineTo(i,-this.length_y);
              
            }
        }
        
    }
}