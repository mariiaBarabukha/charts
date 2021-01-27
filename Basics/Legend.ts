namespace Legend{
    export enum Location{
        Bottom,
        Left,
        Right
    }

    // enum Shape{
    //     Round,
    //     Square
    // }

    export class Legend{
        location:Location;
        // shape:Shape;
        startPoint:Figures.Point;
        x_len:number;
        y_len:number;
        names:string[] = [];

        constructor(startPoint:Figures.Point,x_len:number, y_len:number, location:Location = Location.Bottom){
            this.location = location;
            // this.shape = shape;
            this.startPoint = startPoint;
            this.x_len = x_len;
            this.y_len = y_len;
            console.log("here");
        }

        public add(){
            this.names = ChartData.Data.names;
            console.log(this.names);
            let colorGenerator = new Utils.ColorGenerator();
            let start:Figures.Point;
            switch(this.location){
                case Location.Bottom:
                    start = new Figures.Point(this.x_len/2+Parameters.Parameters.left_margin, 
                        this.startPoint.y+40);
                        
                    break;
                case Location.Left:
                    Parameters.Parameters.left_margin = 40;
                    start = new Figures.Point(5,  - (Parameters.Parameters.bottom_margin) - 0.5*this.y_len+this.startPoint.y);           
                   // console.log(canvas.height - this.y_len/2 - Parameters.Parameters.bottom_margin - (canvas.height-this.startPoint.y));        
                    break;
                case Location.Right:
                    start = new Figures.Point(this.x_len+10+Parameters.Parameters.left_margin+this.startPoint.x,
                        - (Parameters.Parameters.bottom_margin) - 0.5*this.y_len+this.startPoint.y);
                    break;
                default: break;
            }
            for(let i:number = 0; i < this.names.length;i++){
                let shiftPoint:Figures.Point = new Figures.Point(0, 17*i);              
               
                let dot = new Figures.Dot(start.plus(shiftPoint), colorGenerator.next());
                dot.setRadius(4);
                dot.draw();
                dot.justStroke();
                context.save();
                context.font = "15px serif";
                context.fillText(this.names[i], start.x+10, start.y+17*i+3);
                context.restore();
                console.log(dot);
                if(this.location = Location.Bottom){
                    Parameters.Parameters.bottom_margin+=10;
                }               
                
            }
        }
    }
}