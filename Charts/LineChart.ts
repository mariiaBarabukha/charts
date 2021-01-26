namespace Charts{
    export class LineChart extends ScatterChart{
       addToCanvas(){
           super.addToCanvas();
           for(let i:number = 0; i < this.all_x_data.length; i++){
                this.addLines(i);
           }
       }     
       
       colorGenerator = new Utils.ColorGenerator();
       private addLines(n:number){
           Utils.Sorter.sortAsc_linechart(this.all_x_data[n], this.all_y_data[n]);
           console.log(this.x_data,this.y_data);
           let color = this.colorGenerator.next();
            for(let i:number = 0; i < this.all_x_data[n].length; i++){
                this.drawLine(new Figures.Point((this.all_x_data[n][i] - this.minVal_x)* this.int1/this.c_x + this.startPoint.x,
                -(this.all_y_data[n][i] - this.minVal_y)*this.int2/this.c_y+this.startPoint.y), 
                new Figures.Point((this.all_x_data[n][i+1] - this.minVal_x)* this.int1/this.c_x + this.startPoint.x,
                -(this.all_y_data[n][i+1] - this.minVal_y)*this.int2/this.c_y+this.startPoint.y),3,color);
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