namespace Grid{
    
    export class HorizontalGrid extends Grid{
       
        constructor(length_x:number,length_y:number,start:Figures.Point,intervals:number,){
            super(length_x,length_y,start,intervals);
        }

        public markeTheLines(){
            for(let i:number = 0; i>-this.length_y+this.intervals1; i-=this.intervals1){
                
                context.moveTo(0,i);
                context.lineTo(this.length_x,i);
              
            }
        }
        
    }
}