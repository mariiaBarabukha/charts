namespace Figures{
    export class MyLine{
        context: CanvasRenderingContext2D = Models.Model.getContext();        

        draw(start:Point, finish: Point, lineWidth: number = Models.Model.def_lineWidth,
             color:string = Models.Model.def_color){
            context.save();
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(finish.x, finish.y);
            context.lineWidth = lineWidth;
            context.strokeStyle = color;
            context.stroke();                
            context.restore();
        }
    }
}