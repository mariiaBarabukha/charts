const canvas = <HTMLCanvasElement>document.getElementById('chart');
const context = canvas.getContext('2d');

Models.Model.setContext(context);
Models.Model.canvas = canvas;

let zhopaManager = new ChartData.Data("zhopa");

// let xAxis:Axises.XAxis = new Axises.XAxis(300, 10);
// xAxis.setStartCoordinate(new Figures.Point(100, 600));
// xAxis.addToCanvas();
// let yAxis:Axises.YAxis = new Axises.YAxis(400, 10);
// yAxis.setStartCoordinate(new Figures.Point(100, 600));
// yAxis.addToCanvas();

// let myGrid:Grid.CombinedGrid = new Grid.CombinedGrid(300,400,50,new Figures.Point(100,600));
// myGrid.draw();

let data = '{"description":{"x":"sales", "y":"temp"},"data":[{"sales":20, "temp":11}, {"sales":211, "temp":13}, {"sales":110, "temp":10}]}';
let data1 = '{"description":{"x":"sales", "y":"temp"},"data":[{"sales":209, "temp":18}, {"sales":10, "temp":1},{"sales":150, "temp":13}, {"sales":110, "temp":15}]}';
let data2 = '{"description":{"x":"sales", "y":"temp"},"data":[{"sales":100, "temp":10}, {"sales":24, "temp":8},{"sales":110, "temp":13}, {"sales":180, "temp":17}]}';


// let chart = new Charts.ScatterChart(new Figures.Point(100,500));
// chart.addData(data);
// context.save();            
            
// //chart.minVal_x = 100;
// //chart.minVal_y = 10;
// chart.setGrid(Grid.Grids.Combined);
// chart.addToCanvas();

let zhopa = new Charts.LineChart(new Figures.Point(100,500));
zhopa.addData(data);
zhopa.addData(data1);
zhopa.addData(data2);
zhopa.addToCanvas();
