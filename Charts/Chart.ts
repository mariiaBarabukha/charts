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
        

        all_x_data:Array<Array<any>> = [];
        all_y_data:Array<Array<any>> = [];
        constructor(startPoint:Figures.Point, width:number = 300, height:number = 300){
            this.startPoint = new Figures.Point(startPoint.x+Parameters.Parameters.margin, startPoint.y+Parameters.Parameters.margin);
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

        protected find_minVal(){          

            let min_x = 0;          
            let min_y = 0;
           
            if(typeof this.x_data[0] == "string"){
                this.minVal_x = 0;
            }else{
                for(let i:number = 0; i < this.all_x_data.length; i++){
                    let a = this.min(this.all_x_data[i]);
                    if(a < min_x){
                        min_x = a;
                    }
                }

                this.minVal_x = min_x;
            }

            if(typeof this.y_data[0] == "string"){
                this.minVal_y = 0;
            }else{
                for(let i:number = 0; i < this.all_y_data.length; i++){
                    let a = this.min(this.all_y_data[i]);
                    if(a < min_x){
                        min_y = a;
                    }
                }

                this.minVal_y = min_y;
            }
            
            // this.minVal_x = (typeof this.x_data[0] == "string") ? 0 : (this.min(this.all_x_data) < 0 ? this.min(this.all_x_data) : 0);
            // this.minVal_y = (typeof this.y_data[0] == "string") ? 0 : (this.min(this.all_y_data) < 0 ? this.min(this.all_y_data) : 0);

        }

        protected find_maxVal(){

            let max_x = this.max(this.all_x_data[0]);
            let max_y = this.max(this.all_y_data[0]);

            if(typeof this.x_data[0] == "string"){
                this.minVal_x = 0;
            }else{
                for(let i:number = 1; i < this.all_x_data.length; i++){
                    let a = this.max(this.all_x_data[i]);
                    if(a > max_x){
                        max_x = a;
                    }
                }
                

                this.maxVal_x = Utils.myMath.myRound(max_x);
            }

            if(typeof this.y_data[0] == "string"){
                this.minVal_y = 0;
            }else{
                for(let i:number = 1; i < this.all_y_data.length; i++){
                    let a = this.max(this.all_y_data[i]);
                    if(a > max_y){
                        max_y = a;
                    }
                }
               

                this.maxVal_y = Utils.myMath.myRound(max_y);
            }

            // this.maxVal_x = (typeof this.all_x_data[0] == "string") ? this.amountOfElements : 
            //     Utils.myMath.myRound(this.max(this.all_x_data));
            // this.maxVal_y = Utils.myMath.myRound(this.maxVal_y)
            // this.maxVal_y = (typeof this.all_y_data[0] == "string") ? this.amountOfElements :  
            // Utils.myMath.myRound(this.max(this.all_y_data));

        }
        

        private arrayCopy(a:Array<any>){
            let res:Array<any> = [];
            for(let i:number = 0; i < a.length; i++){
                res[i] = a[i];
            }
            return res;
        }

        public addData(dataJSON:string){
            //add parser.ts
            Utils.JSONparser.parse(dataJSON);
            this.data = Utils.JSONparser.data;
            this.description = Utils.JSONparser.description;
            ChartData.Data.description = this.description;

        
            this.x_data =  Utils.JSONparser.x_data;
            this.y_data =  Utils.JSONparser.y_data;

          

            this.amountOfElements = Utils.JSONparser.amountOfElements;
            

            //let all_len = this.all_x_data;
            this.all_x_data.push(this.arrayCopy(this.x_data));
            this.all_y_data.push(this.arrayCopy(this.y_data));
            
            

          // console.log(this.all_x_data,this.all_y_data);


           // console.log(typeof(typeof this.x_data[0]));
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