namespace Figures.ArrowHeads{
    export class SimpleArrowHead extends ArrowHead{
        context: CanvasRenderingContext2D = Models.Model.getContext();
        constructor(start: Figures.Point, width:number, height: number){
            super(start, width, height);
           
        }

        public draw(color: string = Models.Model.def_color, angle:number, lineWidth:number = Models.Model.def_lineWidth){
            context.save();
            context.beginPath();
            context.translate(this.start.x, this.start.y);
            context.rotate(angle);            
            context.moveTo(0, 0);
            context.lineTo(- this.width/2, this.height);
            context.moveTo(0, 0);
            context.lineTo(this.width/2, this.height);
            context.strokeStyle = color;
            context.lineWidth = lineWidth;            
                   
            context.translate(-this.start.x,-this.start.y);
            context.stroke();           
            context.restore();
        }
    }
}