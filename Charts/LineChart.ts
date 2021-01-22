namespace Charts{
    export class LineChart extends ScatterChart{
       addToCanvas(){
           super.addToCanvas();
           this.addLines();
       }     
       
       private addLines(){
           Utils.Sorter.sortAsc_linechart(this.x_data, this.y_data);
           console.log(this.x_data,this.y_data);
            for(let i:number = 0; i < this.amountOfElements-1; i++){
                this.drawLine(new Figures.Point((this.x_data[i] - this.minVal_x)* this.int1/this.c_x + this.startPoint.x,
                -(this.y_data[i] - this.minVal_y)*this.int2/this.c_y+this.startPoint.y), 
                new Figures.Point((this.x_data[i+1] - this.minVal_x)* this.int1/this.c_x + this.startPoint.x,
                -(this.y_data[i+1] - this.minVal_y)*this.int2/this.c_y+this.startPoint.y),3,'red');
            }
       }

       private drawLine(start:Figures.Point, finish:Figures.Point, lineWidth:number, color:string){
           console.log(start, finish);
           context.save();
           context.beginPath();
           context.moveTo(start.x, start.y);
           context.lineTo(finish.x, finish.y);
           context.lineWidth = lineWidth;
           context.strokeStyle = color;
           context.stroke();                
           context.restore();
       }
    }
}