namespace Figures{
    export class Arrow {
        context: CanvasRenderingContext2D = Models.Model.getContext();
       
        basis: MyLine;
        arrowhead: ArrowHeads.ArrowHead;
        

        constructor(start:Point, finish:Point, arrowHead:ArrowHeads.ArrowHead, color:string = Models.Model.def_color,
             lineWidth = Models.Model.def_lineWidth){
            this.basis = new MyLine();
            this.basis.draw(start,finish, lineWidth,color);            
            this.arrowhead = arrowHead;
            let angle = -this.findAngle(start,finish);           
            this.arrowhead.draw(color, angle);
        }

        private findAngle(start:Point, finish:Point){
            console.log(start.x, start.y, finish.x, finish.y);
            let l = Math.sqrt(Math.pow(start.x - finish.x, 2)+Math.pow(start.y - finish.y, 2));  
            console.log(l);          
            return Math.asin((start.x - finish.x)/l);
        }
    }
}