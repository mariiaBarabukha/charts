namespace Grid{
    
    export class VerticalGrid extends Grid{
       
        constructor(length_x:number,length_y:number,start:Figures.Point,intervals:number){
            super(length_x,length_y,start,intervals);
        }

        public markeTheLines(){
            for(let i:number = this.intervals1; i<= this.length_x - this.intervals1; i+=this.intervals1){
                
                context.moveTo(i,0);
                context.lineTo(i,-this.length_y);
              
            }
        }
        
    }
}