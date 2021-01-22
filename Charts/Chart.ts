namespace Charts{
    export abstract class Chart{

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

        theGrid:Grid.Grids = Grid.Grids.Combined;

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

        c_x:number;
        c_y:number;
        a_x:number;
        a_y:number;

        public abstract addToCanvas();
        

        public addData(dataJSON:string){
            //add parser.ts
            Utils.JSONparser.parse(dataJSON);
            this.data = Utils.JSONparser.data;
            this.description = Utils.JSONparser.description;

            this.x_data =  Utils.JSONparser.x_data;
            this.y_data =  Utils.JSONparser.y_data;

            this.amountOfElements = Utils.JSONparser.amountOfElements;


           // console.log(typeof(typeof this.x_data[0]));

            this.maxVal_x = (typeof this.x_data[0] == "string") ? this.amountOfElements : 
                Utils.myMath.myRound(this.max(this.x_data));
            this.maxVal_y = Utils.myMath.myRound(this.maxVal_y)
            this.maxVal_y = (typeof this.y_data[0] == "string") ? this.amountOfElements :  
            Utils.myMath.myRound(this.max(this.y_data));

            this.minVal_x = (typeof this.x_data[0] == "string") ? 0 : (this.min(this.x_data) < 0 ? this.min(this.x_data) : 0);
            this.minVal_y = (typeof this.y_data[0] == "string") ? 0 : (this.min(this.y_data) < 0 ? this.min(this.y_data) : 0);

           // console.log(this.maxVal_x, this.maxVal_y);
        }   
        
        protected max(d:Array<any>){
           // let n = this.x_data.map(x => Number.parseInt(x));
           let m = d[0];
           for(let i:number = 1; i < this.amountOfElements; i++){
                if(d[i] > m){
                    m = d[i];
                }
           }

           return m;
            
        }

        protected min(d:Array<any>){
            // let n = this.x_data.map(x => Number.parseInt(x));
            let m = d[0];
            for(let i:number = 1; i < this.amountOfElements; i++){
                 if(d[i] < m){
                     m = d[i];
                 }
            }
 
            return m;
             
         }

        public setGrid(theGrid:Grid.Grids){
            this.theGrid = theGrid;
        }

        protected addGrid(){

            let myGrid:Grid.Grid;


            switch(this.theGrid){
                case Grid.Grids.Horizontal:{
                    myGrid = new Grid.HorizontalGrid(this.width,this.height,this.startPoint,this.int2);
                    myGrid.draw();
                    break;
                }
                case Grid.Grids.Vertical:{
                    myGrid = new Grid.VerticalGrid(this.width,this.height,this.startPoint,this.int1);
                    myGrid.draw();
                }
                case Grid.Grids.None:{
                    myGrid = null;
                    break;
                }
                case Grid.Grids.Combined:{
                    myGrid = new Grid.CombinedGrid(this.width,this.height,this.startPoint,this.int1,this.int2);
                    myGrid.draw();
                }
                default:{
                    break;
                }
            }

            

        }
    }
}