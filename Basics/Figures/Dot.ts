namespace Figures{
    export class Dot{
        p: Figures.Point;
        context = Models.Model.getContext();
        color:string;
        radius:number = 3;
        constructor(p: Figures.Point, color:string = "red"){
           // console.log(p);
            this.p = p;
            this.color = color;
        }

        public setRadius(r:number){
            this.radius = r;
        }

        public getRadius(){
            return this.radius;
        }

        draw(){
            context.save();
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.p.x, this.p.y, this.radius, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }
    }
}