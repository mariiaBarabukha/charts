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
    Model.def_lineWidth = 1;
    Model.def_color = "black";
    Model.def_arrowHeadWidth = 5;
    Model.def_arrowHeadHeight = 10;
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
                console.log(angle);
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
            this.margin = 30;
            this.startPoint = new Figures.Point(0, Models.Model.canvas.height);
            this.context = Models.Model.getContext();
            this.length = length;
            this.maxVal = maxVal;
            this.minVal = minVal;
        }
        setMargin(m) {
            this.margin = m;
        }
        setStartCoordinate(s) {
            this.startPoint.x = s.x + this.margin;
            this.startPoint.y = s.y - this.margin;
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
const canvas = document.getElementById('chart');
const context = canvas.getContext('2d');
Models.Model.setContext(context);
Models.Model.canvas = canvas;
let xAxis = new Axises.XAxis(300, 10);
xAxis.setStartCoordinate(new Figures.Point(100, 600));
xAxis.addToCanvas();
let yAxis = new Axises.YAxis(400, 10);
yAxis.setStartCoordinate(new Figures.Point(100, 600));
yAxis.addToCanvas();
//# sourceMappingURL=main.js.map