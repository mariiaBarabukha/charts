var Utils;
(function (Utils) {
    class myMath {
        static myRound(num) {
            let neg = false;
            if (num < 0) {
                num = num * (-1);
                neg = true;
            }
            if (num < 10 && num > 0) {
                return 10;
            }
            if (num > -10 && num < 0) {
                return -10;
            }
            let digOrder = this.countDigOrder(num);
            if (digOrder == 2 && num % 10 > 0) {
                num = num - num % 10 + 10;
            }
            if (num % Math.pow(10, digOrder - 2) != 0) {
                num = (num / Math.pow(10, digOrder - 2) + 1) * Math.pow(10, digOrder - 2) - num % Math.pow(10, digOrder - 2);
            }
            return neg ? -num : num;
        }
        static countDigOrder(num) {
            let counter = 1;
            while (num / 10 >= 1) {
                num /= 10;
                ++counter;
            }
            return counter;
        }
    }
    Utils.myMath = myMath;
})(Utils || (Utils = {}));
var Models;
(function (Models) {
    class Model {
        constructor() {
        }
        static getModel() {
            if (this.model == null) {
                this.model = new Model();
            }
            return this.model;
        }
        static setContext(context) {
            this.context = context;
        }
        static getContext() {
            return this.context;
        }
    }
    Model.def_lineWidth = 2;
    Model.def_color = "black";
    Model.def_arrowHeadWidth = 5;
    Model.def_arrowHeadHeight = 10;
    Model.margin = 30;
    Model.def_intervals = 20;
    Models.Model = Model;
})(Models || (Models = {}));
var Figures;
(function (Figures) {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    Figures.Point = Point;
})(Figures || (Figures = {}));
var Figures;
(function (Figures) {
    class MyLine {
        constructor() {
            this.context = Models.Model.getContext();
        }
        draw(start, finish, lineWidth = Models.Model.def_lineWidth, color = Models.Model.def_color) {
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
    Figures.MyLine = MyLine;
})(Figures || (Figures = {}));
var Figures;
(function (Figures) {
    class Dot {
        constructor(p, color = "red") {
            this.context = Models.Model.getContext();
            this.radius = 3;
            console.log(p);
            this.p = p;
            this.color = color;
        }
        setRadius(r) {
            this.radius = r;
        }
        getRadius() {
            return this.radius;
        }
        draw() {
            context.save();
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.p.x, this.p.y, this.radius, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }
    }
    Figures.Dot = Dot;
})(Figures || (Figures = {}));
var Grid;
(function (Grid_1) {
    let Grids;
    (function (Grids) {
        Grids[Grids["Horizontal"] = 0] = "Horizontal";
        Grids[Grids["Vertical"] = 1] = "Vertical";
        Grids[Grids["Combined"] = 2] = "Combined";
        Grids[Grids["None"] = 3] = "None";
    })(Grids = Grid_1.Grids || (Grid_1.Grids = {}));
    class Grid {
        constructor(length_x, length_y, start, intervals1, intervals2 = 0) {
            this.context = Models.Model.getContext();
            this.length_x = length_x;
            this.length_y = length_y;
            this.intervals1 = intervals1;
            this.intervals2 = intervals2;
            this.start = start;
            console.log(this);
            console.log(this.start);
        }
        setGridLineWidth(w) {
            this.lineWidth = w;
        }
        draw() {
            context.save();
            context.beginPath();
            //don't forget to delete margin
            context.translate(this.start.x, this.start.y);
            context.strokeStyle = "black";
            context.lineWidth = this.lineWidth;
            this.markeTheLines();
            context.stroke();
            context.restore();
        }
    }
    Grid_1.Grid = Grid;
})(Grid || (Grid = {}));
var Grid;
(function (Grid) {
    class HorizontalGrid extends Grid.Grid {
        constructor(length_x, length_y, start, intervals) {
            super(length_x, length_y, start, intervals);
        }
        markeTheLines() {
            for (let i = -this.length_y + this.intervals1; i < 0; i += this.intervals1) {
                context.moveTo(0, i);
                context.lineTo(this.length_x, i);
            }
        }
    }
    Grid.HorizontalGrid = HorizontalGrid;
})(Grid || (Grid = {}));
var Grid;
(function (Grid) {
    class VerticalGrid extends Grid.Grid {
        constructor(length_x, length_y, start, intervals) {
            super(length_x, length_y, start, intervals);
        }
        markeTheLines() {
            for (let i = this.intervals1; i <= this.length_x - this.intervals1; i += this.intervals1) {
                context.moveTo(i, 0);
                context.lineTo(i, -this.length_y);
            }
        }
    }
    Grid.VerticalGrid = VerticalGrid;
})(Grid || (Grid = {}));
var Grid;
(function (Grid) {
    class CombinedGrid extends Grid.Grid {
        constructor(length_x, length_y, start, intervals, intervals2) {
            console.log(intervals, intervals2);
            super(length_x, length_y, start, intervals, intervals2);
        }
        markeTheLines() {
            for (let i = -this.length_y + this.intervals1; i < 0; i += this.intervals1) {
                context.moveTo(0, i);
                context.lineTo(this.length_x, i);
            }
            for (let i = this.intervals2; i <= this.length_x - this.intervals2; i += this.intervals2) {
                context.moveTo(i, 0);
                context.lineTo(i, -this.length_y);
            }
        }
    }
    Grid.CombinedGrid = CombinedGrid;
})(Grid || (Grid = {}));
var Figures;
(function (Figures) {
    class Arrow {
        constructor(start, finish, arrowHead, color = Models.Model.def_color, lineWidth = Models.Model.def_lineWidth) {
            this.context = Models.Model.getContext();
            this.basis = new Figures.MyLine();
            this.basis.draw(start, finish, lineWidth, color);
            this.arrowhead = arrowHead;
            let angle = -this.findAngle(start, finish);
            this.arrowhead.draw(color, angle);
        }
        findAngle(start, finish) {
            console.log(start.x, start.y, finish.x, finish.y);
            let l = Math.sqrt(Math.pow(start.x - finish.x, 2) + Math.pow(start.y - finish.y, 2));
            console.log(l);
            return Math.asin((start.x - finish.x) / l);
        }
    }
    Figures.Arrow = Arrow;
})(Figures || (Figures = {}));
var Figures;
(function (Figures) {
    var ArrowHeads;
    (function (ArrowHeads) {
        class ArrowHead {
            constructor(start, width, height) {
                this.start = start;
                this.width = width;
                this.height = height;
            }
        }
        ArrowHeads.ArrowHead = ArrowHead;
    })(ArrowHeads = Figures.ArrowHeads || (Figures.ArrowHeads = {}));
})(Figures || (Figures = {}));
var Figures;
(function (Figures) {
    var ArrowHeads;
    (function (ArrowHeads) {
        class SimpleArrowHead extends ArrowHeads.ArrowHead {
            constructor(start, width, height) {
                super(start, width, height);
                this.context = Models.Model.getContext();
            }
            draw(color = Models.Model.def_color, angle, lineWidth = Models.Model.def_lineWidth) {
                context.save();
                context.beginPath();
                context.translate(this.start.x, this.start.y);
                context.rotate(angle);
                context.moveTo(0, 0);
                context.lineTo(-this.width / 2, this.height);
                context.moveTo(0, 0);
                context.lineTo(this.width / 2, this.height);
                context.strokeStyle = color;
                context.lineWidth = lineWidth;
                context.translate(-this.start.x, -this.start.y);
                context.stroke();
                context.restore();
            }
        }
        ArrowHeads.SimpleArrowHead = SimpleArrowHead;
    })(ArrowHeads = Figures.ArrowHeads || (Figures.ArrowHeads = {}));
})(Figures || (Figures = {}));
var Axises;
(function (Axises) {
    class Axis {
        constructor(length, maxVal, minVal = 0) {
            this.startPoint = new Figures.Point(0, Models.Model.canvas.height);
            this.context = Models.Model.getContext();
            this.length = length;
            this.maxVal = maxVal;
            this.minVal = minVal;
        }
        setMargin(m) {
            Models.Model.margin = m;
        }
        setStartCoordinate(s) {
            this.startPoint.x = s.x;
            this.startPoint.y = s.y;
        }
        addToCanvas() {
            console.log(this.length);
            this.finishPoint = this.calculateFinishPoint();
            let a = new Figures.Arrow(this.startPoint, this.finishPoint, new Figures.ArrowHeads.SimpleArrowHead(this.finishPoint, Models.Model.def_arrowHeadWidth, Models.Model.def_arrowHeadHeight));
        }
    }
    Axises.Axis = Axis;
})(Axises || (Axises = {}));
var Axises;
(function (Axises) {
    class XAxis extends Axises.Axis {
        constructor(length, maxVal, minVal = 0) {
            super(length, maxVal, minVal);
        }
        calculateFinishPoint() {
            return new Figures.Point(this.startPoint.x + this.length, this.startPoint.y);
        }
    }
    Axises.XAxis = XAxis;
})(Axises || (Axises = {}));
var Axises;
(function (Axises) {
    class YAxis extends Axises.Axis {
        constructor(length, maxVal, minVal = 0) {
            super(length, maxVal, minVal);
        }
        calculateFinishPoint() {
            return new Figures.Point(this.startPoint.x, this.startPoint.y - this.length);
        }
    }
    Axises.YAxis = YAxis;
})(Axises || (Axises = {}));
var Charts;
(function (Charts) {
    class ScatterChart {
        constructor(startPoint, width = 300, height = 300) {
            this.context = Models.Model.getContext();
            this.minVal_x = 0;
            this.minVal_y = 0;
            this.theGrid = Grid.Grids.Combined;
            this.amountOfElements = 0;
            this.x_data = [];
            this.y_data = [];
            this.scale_x = 1;
            this.scale_y = 1;
            this.startPoint = new Figures.Point(startPoint.x + Models.Model.margin, startPoint.y + Models.Model.margin);
            this.width = width;
            this.height = height;
        }
        setScale_x(s) {
            this.scale_x = s;
        }
        setScale_y(s) {
            this.scale_y = s;
        }
        calculateScales() {
            if (this.maxVal_x - this.minVal_x > this.maxVal_y - this.minVal_y) {
                this.scale_x = (this.maxVal_x - this.minVal_x) / (this.maxVal_y - this.minVal_y);
            }
            else {
                this.scale_y = (this.maxVal_y - this.minVal_y) / (this.maxVal_x - this.minVal_x);
            }
        }
        calculateIntervals() {
            this.maxVal_x = Utils.myMath.myRound(this.maxVal_x);
            this.maxVal_y = Utils.myMath.myRound(this.maxVal_y);
            this.minVal_x = Utils.myMath.myRound(this.minVal_x);
            this.minVal_y = Utils.myMath.myRound(this.minVal_y);
            let digOrMaxX = Utils.myMath.countDigOrder(this.maxVal_x);
            let digOrMaxY = Utils.myMath.countDigOrder(this.maxVal_y);
            let digOrMinX = Utils.myMath.countDigOrder(this.minVal_x);
            let digOrMinY = Utils.myMath.countDigOrder(this.minVal_y);
            this.interval1 = this.width / (this.maxVal_x - this.minVal_x);
            this.interval2 = this.height / (this.maxVal_y - this.minVal_y);
        }
        addToCanvas() {
            let xAxis = new Axises.XAxis(this.width, this.maxVal_x, this.minVal_y);
            xAxis.setStartCoordinate(this.startPoint);
            xAxis.addToCanvas();
            let yAxis = new Axises.YAxis(this.height, this.maxVal_y, this.minVal_y);
            yAxis.setStartCoordinate(this.startPoint);
            yAxis.addToCanvas();
            this.calculateScales();
            this.calculateIntervals();
            this.addGrid();
            this.addDots();
        }
        setGrid(theGrid) {
            this.theGrid = theGrid;
        }
        addGrid() {
            let myGrid;
            switch (this.theGrid) {
                case Grid.Grids.Horizontal: {
                    myGrid = new Grid.HorizontalGrid(this.width, this.height, this.startPoint, this.scale_x * this.interval2);
                    break;
                }
                case Grid.Grids.Vertical: {
                    myGrid = new Grid.VerticalGrid(this.width, this.height, this.startPoint, this.scale_y * this.interval1);
                }
                case Grid.Grids.None: {
                    myGrid = null;
                    break;
                }
                case Grid.Grids.Combined: {
                    myGrid = new Grid.CombinedGrid(this.width, this.height, this.startPoint, this.scale_y * this.interval2, this.scale_x * this.interval1);
                }
                default: {
                    break;
                }
            }
            myGrid.draw();
        }
        addDots() {
            context.save();
            console.log(this.interval1, this.interval2);
            context.translate(this.startPoint.x, this.startPoint.y);
            for (let i = 0; i < this.amountOfElements; i++) {
                let d = new Figures.Dot(new Figures.Point((this.x_data[i]) * (this.width / this.maxVal_x), -(this.y_data[i]) * (this.height / this.maxVal_y)));
                d.draw();
            }
            context.restore();
        }
        addData(dataJSON) {
            //add parser.ts
            let data = JSON.parse(dataJSON);
            this.data = data["data"];
            this.description = data["description"];
            this.amountOfElements = this.data.length;
            for (let i = 0; i < this.amountOfElements; i++) {
                this.x_data[i] = (this.data[i])[this.description["x"]];
                this.y_data[i] = (this.data[i])[this.description["y"]];
            }
            console.log(typeof (typeof this.x_data[0]));
            this.maxVal_x = (typeof this.x_data[0] == "string") ? this.amountOfElements : this.max(this.x_data);
            this.maxVal_y = (typeof this.y_data[0] == "string") ? this.amountOfElements : this.max(this.y_data);
            console.log(this.maxVal_x, this.maxVal_y);
        }
        max(d) {
            // let n = this.x_data.map(x => Number.parseInt(x));
            let m = d[0];
            for (let i = 1; i < this.amountOfElements; i++) {
                if (d[i] > m) {
                    m = d[i];
                }
            }
            return m;
        }
    }
    Charts.ScatterChart = ScatterChart;
})(Charts || (Charts = {}));
const canvas = document.getElementById('chart');
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
let chart = new Charts.ScatterChart(new Figures.Point(100, 500));
chart.addData(data);
chart.minVal_x = 100;
chart.minVal_y = 10;
chart.addToCanvas();
//# sourceMappingURL=main.js.map