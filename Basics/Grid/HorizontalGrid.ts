namespace Grid{
    
    export class HorizontalGrid extends Grid{
       
        constructor(length_x:number,length_y:number,intervals:number,start:Figures.Point){
            super(length_x,length_y,intervals,start);
        }

        public markeTheLines(){
            for(let i:number = -this.length_y+this.intervals; i<0; i+=this.intervals){
                
                context.moveTo(0,i);
                context.lineTo(this.length_x,i);
              
            }
        }
        
    }
}