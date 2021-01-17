namespace Grid{
    export class CombinedGrid extends Grid{

        constructor(length_x:number,length_y:number,start:Figures.Point,intervals:number,intervals2:number){
            console.log(intervals,intervals2);
            super(length_x,length_y,start,intervals,intervals2);
        }

        markeTheLines(){
            let h_grid = new HorizontalGrid(this.length_x, this.length_y,this.start, this.intervals2);
            let v_grid = new VerticalGrid(this.length_x, this.length_y,this.start, this.intervals1);
            h_grid.markeTheLines();
            v_grid.markeTheLines();
        }


    }
}