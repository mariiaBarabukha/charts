namespace Charts{
    export class ScatterChart extends Chart{

        
        constructor(startPoint:Figures.Point, width:number = 300, height:number = 300){
            super(startPoint, width, height);
        }        

        public addToCanvas(){       
            let xAxis:Axises.XAxis = new Axises.XAxis(this.width, this.maxVal_x, this.minVal_y);
            xAxis.setStartCoordinate(this.startPoint);
            xAxis.addToCanvas();
            let yAxis:Axises.YAxis = new Axises.YAxis(this.height, this.maxVal_y, this.minVal_y);
            yAxis.setStartCoordinate(this.startPoint);
            yAxis.addToCanvas();  

            this.find_maxVal();
            this.find_minVal();

            console.log(this.maxVal_x,this.minVal_x, this.maxVal_y,this.minVal_y);
           
            this.c_x = Math.pow(10,Utils.myMath.countDigOrder(this.maxVal_x-this.minVal_x)-2);
            this.c_y = Math.pow(10,Utils.myMath.countDigOrder(this.maxVal_y - this.minVal_y)-2);
            this.a_x = (this.maxVal_x - this.minVal_x)/this.c_x;
            this.a_y = (this.maxVal_y - this.minVal_y)/this.c_y;
           
            
            this.int1 = this.width/this.a_x;
            this.int2 = this.height/this.a_y;           
            this.addGrid();
            for(let i:number = 0; i < this.all_x_data.length;i++){
                
                this.addDots(i);
            }
            
        }
        
        colorGenerator = new Utils.ColorGenerator();

        private addDots(j:number){
           
            context.save();        
            let color = this.colorGenerator.next();   
           // console.log(-(this.y_data[0] - this.minVal_y)*this.int2/this.c_y, this.y_data[0],this.int2, this.c_y);
           for(let i:number = 0; i < this.amountOfElements; i++){
            console.log(this.all_y_data[j][i]);
            
            let d = new Figures.Dot(new Figures.Point((this.all_x_data[j][i] - this.minVal_x)* this.int1/this.c_x + this.startPoint.x,
                 -(this.all_y_data[j][i] - this.minVal_y)*this.int2/this.c_y+this.startPoint.y),color);
            d.draw();
        }
            
            context.restore();
        }   
        
    }
}