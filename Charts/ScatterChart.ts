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

        theGrid:Grid.Grids = Grid.Grids.Combined;

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

        interval1:number;
        interval2:number;

        private calculateScales(){

            if(this.maxVal_x-this.minVal_x > this.maxVal_y-this.minVal_y){
                this.scale_x = (this.maxVal_x-this.minVal_x)/(this.maxVal_y-this.minVal_y)
            }else{
                this.scale_y = (this.maxVal_y-this.minVal_y)/(this.maxVal_x-this.minVal_x)
            }
        }

        private calculateIntervals(){
            
            this.maxVal_x = Utils.myMath.myRound(this.maxVal_x);
            this.maxVal_y = Utils.myMath.myRound(this.maxVal_y);

            this.minVal_x = Utils.myMath.myRound(this.minVal_x);
            this.minVal_y = Utils.myMath.myRound(this.minVal_y);

            let digOrMaxX:number = Utils.myMath.countDigOrder(this.maxVal_x);
            let digOrMaxY:number = Utils.myMath.countDigOrder(this.maxVal_y);

            let digOrMinX:number = Utils.myMath.countDigOrder(this.minVal_x);
            let digOrMinY:number = Utils.myMath.countDigOrder(this.minVal_y);

            this.interval1 = this.width/(this.maxVal_x - this.minVal_x);
            this.interval2 = this.height/(this.maxVal_y - this.minVal_y); 
        }

        public addToCanvas(){
            let xAxis:Axises.XAxis = new Axises.XAxis(this.width, this.maxVal_x, this.minVal_y);
            xAxis.setStartCoordinate(this.startPoint);
            xAxis.addToCanvas();
            let yAxis:Axises.YAxis = new Axises.YAxis(this.height,this.maxVal_y, this.minVal_y);
            yAxis.setStartCoordinate(this.startPoint);
            yAxis.addToCanvas();

            this.calculateScales();
            this.calculateIntervals();
            this.addGrid();
            this.addDots();


        }

        public setGrid(theGrid:Grid.Grids){
            this.theGrid = theGrid;
        }

        private addGrid(){

            let myGrid:Grid.Grid;
            

            switch(this.theGrid){
                case Grid.Grids.Horizontal:{
                    myGrid = new Grid.HorizontalGrid(this.width,this.height,this.startPoint,this.scale_x*this.interval2);
                    break;
                }
                case Grid.Grids.Vertical:{
                    myGrid = new Grid.VerticalGrid(this.width,this.height,this.startPoint,this.scale_y*this.interval1);
                }
                case Grid.Grids.None:{
                    myGrid = null;
                    break;
                }
                case Grid.Grids.Combined:{
                    myGrid = new Grid.CombinedGrid(this.width,this.height,this.startPoint,this.scale_y*this.interval2,this.scale_x*this.interval1);
                }
                default:{
                    break;
                }
            }

            myGrid.draw();

        }

        private addDots(){
            
            context.save();
            console.log(this.interval1, this.interval2);
            context.translate(this.startPoint.x, this.startPoint.y);
            
            for(let i:number = 0; i < this.amountOfElements; i++){
                let d = new Figures.Dot(new Figures.Point((this.x_data[i])* (this.width/this.maxVal_x),
                     -(this.y_data[i])*(this.height/this.maxVal_y)));
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