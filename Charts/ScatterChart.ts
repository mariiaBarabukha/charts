namespace Charts{
    export class ScatterChart{

        context = Models.Model.getContext();

        startPoint:Figures.Point;
        width:number;
        height:number;


        data:Array<object>;
        description:object;
        

        minVal_x:number = 0;
        maxVal_x:number;

        minVal_y:number = 0;
        maxVal_y:number;

        amountOfElements:number = 0;

        x_data:Array<any> = [];
        y_data:Array<any> = [];

        scale_x:number = 1;
        scale_y:number = 1;
        constructor(startPoint:Figures.Point, width:number = 300, height:number = 300){
            this.startPoint = new Figures.Point(startPoint.x+Models.Model.margin, startPoint.y+Models.Model.margin);
            this.width = width;
            this.height = height;
        }

        public setScale_x(s:number){
            this.scale_x = s;
        }

        public setScale_y(s:number){
            this.scale_y = s;
        }

        int1: number;
        int2:number;

        public addToCanvas(){
            let xAxis:Axises.XAxis = new Axises.XAxis(this.width, this.maxVal_x, this.minVal_y);
            xAxis.setStartCoordinate(this.startPoint);
            xAxis.addToCanvas();
            let yAxis:Axises.YAxis = new Axises.YAxis(this.height, this.maxVal_y, this.minVal_y);
            yAxis.setStartCoordinate(this.startPoint);
            yAxis.addToCanvas();

            this.int1 = (this.width - Models.Model.margin)/(this.maxVal_x-this.minVal_x);
            this.int2 = (this.height)/(this.maxVal_y-this.minVal_y);

            if( this.int1 < 20){
                this.setScale_x(20/ this.int1);
            }

            if( this.int2 < 20){
                this.setScale_y(20/ this.int2);
            }
            let myGrid:Grid.CombinedGrid = new Grid.CombinedGrid(xAxis.length, yAxis.length,
                this.startPoint,
                this.int1*this.scale_x,
                this.int2*this.scale_y);
                myGrid.setGridLineWidth(1);
            myGrid.draw();

            this.addDots();


        }

        private addDots(){
            context.save();
            console.log(this.int1, this.int2);
            context.translate(this.startPoint.x, this.startPoint.y);
            for(let i:number = 0; i < this.amountOfElements; i++){
                let d = new Figures.Dot(new Figures.Point((this.x_data[i] - this.minVal_x)* this.int1,
                     -(this.y_data[i] - this.minVal_y)*this.int2));
                d.draw();
            }
            context.restore();
        }

        public addData(dataJSON:string){
            //add parser.ts
            let data = JSON.parse(dataJSON);           

            this.data = data["data"];
            this.description = data["description"];

            this.amountOfElements = this.data.length;
            

            for(let i:number = 0; i < this.amountOfElements; i++){
                this.x_data[i] = (this.data[i])[this.description["x"]];
                this.y_data[i] = (this.data[i])[this.description["y"]];
            }


            console.log(typeof(typeof this.x_data[0]));

            this.maxVal_x = (typeof this.x_data[0] == "string") ? this.amountOfElements : this.max(this.x_data);
            this.maxVal_y = (typeof this.y_data[0] == "string") ? this.amountOfElements : this.max(this.y_data);

            console.log(this.maxVal_x, this.maxVal_y);
        }   
        
        private max(d:Array<any>){
           // let n = this.x_data.map(x => Number.parseInt(x));
           let m = d[0];
           for(let i:number = 1; i < this.amountOfElements; i++){
                if(d[i] > m){
                    m = d[i];
                }
           }

           return m;
            
        }
    }
}