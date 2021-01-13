const canvas = <HTMLCanvasElement>document.getElementById('chart');
const context = canvas.getContext('2d');

Models.Model.setContext(context);
Models.Model.canvas = canvas;

// let xAxis:Axises.XAxis = new Axises.XAxis(300, 10);
// xAxis.setStartCoordinate(new Figures.Point(100, 600));
// xAxis.addToCanvas();
// let yAxis:Axises.YAxis = new Axises.YAxis(400, 10);
// yAxis.setStartCoordinate(new Figures.Point(100, 600));
// yAxis.addToCanvas();

// let myGrid:Grid.CombinedGrid = new Grid.CombinedGrid(300,400,50,new Figures.Point(100,600));
// myGrid.draw();

let data = '{"description":{"x":"sales", "y":"temp"},"data":[{"sales":200, "temp":12}, {"sales":217, "temp":13}]}';

let chart = new Charts.ScatterChart(new Figures.Point(100,500));
chart.addData(data);
chart.minVal_x = 100;
chart.minVal_y = 10;
chart.addToCanvas();


