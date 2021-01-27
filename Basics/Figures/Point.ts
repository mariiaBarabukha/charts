namespace Figures{
    export class Point{
        x:number;
        y:number;

        constructor(x:number, y:number){
            this.x=x;
            this.y=y;
        }

        public plus(p:Point){
            return new Point(this.x+p.x, this.y+p.y);
        }
    }
}