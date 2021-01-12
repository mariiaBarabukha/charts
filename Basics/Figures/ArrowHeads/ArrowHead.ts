namespace Figures.ArrowHeads{
    export abstract class ArrowHead {
        start: Figures.Point;
        width:number;
        height: number;        
        constructor(start: Figures.Point, width:number, height: number) {
            this.start=start;
            this.width=width;
            this.height=height;
            
        }

        abstract draw(color:string, angle:number);
    }
}