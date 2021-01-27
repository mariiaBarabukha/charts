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
var Utils;
(function (Utils) {
    class JSONparser {
        static parse(dataJSON) {
            let data = JSON.parse(dataJSON);
            this.data = data["data"];
            //console.log(this.data);
            this.description = data["description"];
            console.log(this.description);
            this.amountOfElements = this.data.length;
            for (let i = 0; i < this.amountOfElements; i++) {
                this.x_data[i] = (this.data[i])[this.description["x"]];
                this.y_data[i] = (this.data[i])[this.description["y"]];
            }
            this.names.push(this.description["name"]);
            //console.log(this.x_data, this.y_data, this.x_data.length);
        }
    }
    JSONparser.description = {};
    JSONparser.amountOfElements = 0;
    JSONparser.x_data = [];
    JSONparser.y_data = [];
    JSONparser.names = [];
    Utils.JSONparser = JSONparser;
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    class Sorter {
        static partition(items, y, left, right) {
            var pivot = items[Math.floor((right + left) / 2)], //middle element
            i = left, //left pointer
            j = right; //right pointer
            while (i <= j) {
                while (items[i] < pivot) {
                    i++;
                }
                while (items[j] > pivot) {
                    j--;
                }
                if (i <= j) {
                    this.swap(items, y, i, j); //sawpping two elements
                    i++;
                    j--;
                }
            }
            return i;
        }
        static quickSort(items, y, left, right) {
            var index;
            if (items.length > 1) {
                index = this.partition(items, y, left, right); //index returned from partition
                if (left < index - 1) { //more elements on the left side of the pivot
                    this.quickSort(items, y, left, index - 1);
                }
                if (index < right) { //more elements on the right side of the pivot
                    this.quickSort(items, y, index, right);
                }
            }
            return items;
        }
        static sortAsc_linechart(items, y_data) {
            this.quickSort(items, y_data, 0, items.length - 1);
        }
        //     private static partition(items:Array<any>, y:Array<any>, 
        //         left:number, right:number) {
        //         let pivot   = items[Math.floor((right + left) / 2)],
        //             i       = left,
        //             j       = right;
        //         while (i <= j) {
        //             while (items[i] < pivot) {
        //                 i++;
        //             }
        //             while (items[j] > pivot) {
        //                 j--;
        //             }
        //             if (i <= j) {
        //                 this.swap(items, y, i, j);
        //                 i++;
        //                 j--;
        //             }
        //         }
        //         return i;
        //     }
        static swap(items, y, firstIndex, secondIndex) {
            let temp = items[firstIndex];
            items[firstIndex] = items[secondIndex];
            items[secondIndex] = temp;
            temp = y[firstIndex];
            y[firstIndex] = y[secondIndex];
            y[secondIndex] = temp;
        }
    }
    Utils.Sorter = Sorter;
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    class ColorGenerator {
        constructor() {
            this.currentColor = 0;
            this.basic_colors = [0xFF0000, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF00FF];
            this.colors = [0xFF0000, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF00FF];
            this.counter = 0;
        }
        next() {
            if (this.counter >= this.colors.length - 1) {
                this.counter = this.counter % 5;
                this.colors.forEach(c => {
                    c /= 2;
                });
            }
            this.currentColor = this.colors[this.counter];
            ++this.counter;
            let hexcolor = this.currentColor.toString(16).toUpperCase();
            let zeroSToAdd = 6 - hexcolor.length;
            for (let i = 0; i < zeroSToAdd; ++i) {
                hexcolor = "0" + hexcolor;
            }
            return "#" + hexcolor;
        }
        refresh() {
            for (let i = 0; i < this.colors.length; i++) {
                this.colors[i] = this.basic_colors[i];
            }
            this.counter = 0;
        }
    }
    Utils.ColorGenerator = ColorGenerator;
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
    Models.Model = Model;
})(Models || (Models = {}));
var ChartData;
(function (ChartData) {
    class Data {
        constructor(filename) {
            this.filename = filename;
        }
        readJSON() {
            let file = new FileReader();
            //this.text = file.readAsText(new File());
        }
    }
    Data.description = Utils.JSONparser.description;
    Data.names = [];
    ChartData.Data = Data;
})(ChartData || (ChartData = {}));
var Parameters;
(function (Parameters_1) {
    class Parameters {
    }
    Parameters.def_lineWidth = 2;
    Parameters.def_color = "black";
    Parameters.def_arrowHeadWidth = 5;
    Parameters.def_arrowHeadHeight = 10;
    Parameters.margin = 30;
    Parameters.left_margin = 30;
    Parameters.bottom_margin = 30;
    Parameters.def_intervals = 20;
    Parameters_1.Parameters = Parameters;
})(Parameters || (Parameters = {}));
var Figures;
(function (Figures) {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        plus(p) {
            return new Point(this.x + p.x, this.y + p.y);
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
        draw(start, finish, lineWidth = Parameters.Parameters.def_lineWidth, color = Parameters.Parameters.def_color) {
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
            // console.log(p);
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
        justStroke() {
            context.save();
            context.beginPath();
            context.strokeStyle = "black";
            context.arc(this.p.x, this.p.y, this.radius, 0, Math.PI * 2);
            context.stroke();
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
            // console.log(this)
            //console.log(this.start)
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
            for (let i = 0; i > -this.length_y + this.intervals1; i -= this.intervals1) {
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
            let h_grid = new Grid.HorizontalGrid(this.length_x, this.length_y, this.start, this.intervals2);
            let v_grid = new Grid.VerticalGrid(this.length_x, this.length_y, this.start, this.intervals1);
            h_grid.markeTheLines();
            v_grid.markeTheLines();
        }
    }
    Grid.CombinedGrid = CombinedGrid;
})(Grid || (Grid = {}));
var Legend;
(function (Legend_1) {
    let Location;
    (function (Location) {
        Location[Location["Bottom"] = 0] = "Bottom";
        Location[Location["Left"] = 1] = "Left";
        Location[Location["Right"] = 2] = "Right";
    })(Location = Legend_1.Location || (Legend_1.Location = {}));
    // enum Shape{
    //     Round,
    //     Square
    // }
    class Legend {
        constructor(startPoint, x_len, y_len, location = Location.Bottom) {
            this.names = [];
            this.location = location;
            // this.shape = shape;
            this.startPoint = startPoint;
            this.x_len = x_len;
            this.y_len = y_len;
            console.log("here");
        }
        add() {
            this.names = ChartData.Data.names;
            console.log(this.names);
            let colorGenerator = new Utils.ColorGenerator();
            let start;
            switch (this.location) {
                case Location.Bottom:
                    start = new Figures.Point(this.x_len / 2 + Parameters.Parameters.left_margin, this.startPoint.y + 40);
                    break;
                case Location.Left:
                    Parameters.Parameters.left_margin = 40;
                    start = new Figures.Point(5, -(Parameters.Parameters.bottom_margin) - 0.5 * this.y_len + this.startPoint.y);
                    // console.log(canvas.height - this.y_len/2 - Parameters.Parameters.bottom_margin - (canvas.height-this.startPoint.y));        
                    break;
                case Location.Right:
                    start = new Figures.Point(this.x_len + 10 + Parameters.Parameters.left_margin + this.startPoint.x, -(Parameters.Parameters.bottom_margin) - 0.5 * this.y_len + this.startPoint.y);
                    break;
                default: break;
            }
            for (let i = 0; i < this.names.length; i++) {
                let shiftPoint = new Figures.Point(0, 17 * i);
                let dot = new Figures.Dot(start.plus(shiftPoint), colorGenerator.next());
                dot.setRadius(4);
                dot.draw();
                dot.justStroke();
                context.save();
                context.font = "15px serif";
                context.fillText(this.names[i], start.x + 10, start.y + 17 * i + 3);
                context.restore();
                console.log(dot);
                if (this.location = Location.Bottom) {
                    Parameters.Parameters.bottom_margin += 10;
                }
            }
        }
    }
    Legend_1.Legend = Legend;
})(Legend || (Legend = {}));
var Figures;
(function (Figures) {
    class Arrow {
        constructor(start, finish, arrowHead, color = Parameters.Parameters.def_color, lineWidth = Parameters.Parameters.def_lineWidth) {
            this.context = Models.Model.getContext();
            this.basis = new Figures.MyLine();
            this.basis.draw(start, finish, lineWidth, color);
            this.arrowhead = arrowHead;
            let angle = -this.findAngle(start, finish);
            this.arrowhead.draw(color, angle);
        }
        findAngle(start, finish) {
            //console.log(start.x, start.y, finish.x, finish.y);
            let l = Math.sqrt(Math.pow(start.x - finish.x, 2) + Math.pow(start.y - finish.y, 2));
            //console.log(l);          
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
            draw(color = Parameters.Parameters.def_color, angle, lineWidth = Parameters.Parameters.def_lineWidth) {
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
//to be continued
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
            Parameters.Parameters.margin = m;
        }
        setStartCoordinate(s) {
            this.startPoint.x = s.x;
            this.startPoint.y = s.y;
        }
        addToCanvas() {
            this.finishPoint = this.calculateFinishPoint();
            let a = new Figures.Arrow(this.startPoint, this.finishPoint, new Figures.ArrowHeads.SimpleArrowHead(this.finishPoint, Parameters.Parameters.def_arrowHeadWidth, Parameters.Parameters.def_arrowHeadHeight));
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
        addAxisName() {
            context.font = "10px serif";
            context.strokeText("x", this.startPoint.x + this.length - 10, this.startPoint.y + 10);
        }
        addLabel() {
            context.save();
            context.font = "20px serif";
            context.textAlign = "center";
            console.log(ChartData.Data.description);
            context.fillText(ChartData.Data.description["x"], this.startPoint.x + this.length / 2, this.startPoint.y + 21);
            context.restore();
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
        addAxisName() {
            context.font = "10px serif";
            //context.fillText("y",this.startPoint.x-10,this.startPoint.y-this.length+10);
            context.strokeText("y", this.startPoint.x - 10, this.startPoint.y - this.length + 10);
        }
        addLabel() {
            context.save();
            context.font = "20px serif";
            context.translate(this.startPoint.x, this.startPoint.y);
            context.rotate(Math.PI / 2);
            context.textAlign = "center";
            //context.rotate(Math.PI/2);
            context.fillText(ChartData.Data.description["y"], -this.length / 2, 17);
            console.log(this.startPoint.x - 10, this.startPoint.y - this.length / 2);
            context.restore();
        }
    }
    Axises.YAxis = YAxis;
})(Axises || (Axises = {}));
var Charts;
(function (Charts) {
    class Chart {
        constructor(startPoint, width = 300, height = 300) {
            this.context = Models.Model.getContext();
            this.minVal_x = 0;
            this.minVal_y = 0;
            this.amountOfElements = 0;
            this.x_data = [];
            this.y_data = [];
            this.theGrid = Grid.Grids.Combined;
            this.scale_x = 1;
            this.scale_y = 1;
            this.all_x_data = [];
            this.all_y_data = [];
            this.startPoint = new Figures.Point(startPoint.x, startPoint.y);
            this.width = width;
            this.height = height;
        }
        setScale_x(s) {
            this.scale_x = s;
        }
        setScale_y(s) {
            this.scale_y = s;
        }
        find_minVal() {
            let min_x = 0;
            let min_y = 0;
            if (typeof this.x_data[0] == "string") {
                this.minVal_x = 0;
            }
            else {
                for (let i = 0; i < this.all_x_data.length; i++) {
                    let a = this.min(this.all_x_data[i]);
                    if (a < min_x) {
                        min_x = a;
                    }
                }
                this.minVal_x = min_x;
            }
            if (typeof this.y_data[0] == "string") {
                this.minVal_y = 0;
            }
            else {
                for (let i = 0; i < this.all_y_data.length; i++) {
                    let a = this.min(this.all_y_data[i]);
                    if (a < min_x) {
                        min_y = a;
                    }
                }
                this.minVal_y = min_y;
            }
            // this.minVal_x = (typeof this.x_data[0] == "string") ? 0 : (this.min(this.all_x_data) < 0 ? this.min(this.all_x_data) : 0);
            // this.minVal_y = (typeof this.y_data[0] == "string") ? 0 : (this.min(this.all_y_data) < 0 ? this.min(this.all_y_data) : 0);
        }
        find_maxVal() {
            let max_x = this.max(this.all_x_data[0]);
            let max_y = this.max(this.all_y_data[0]);
            if (typeof this.x_data[0] == "string") {
                this.minVal_x = 0;
            }
            else {
                for (let i = 1; i < this.all_x_data.length; i++) {
                    let a = this.max(this.all_x_data[i]);
                    if (a > max_x) {
                        max_x = a;
                    }
                }
                this.maxVal_x = Utils.myMath.myRound(max_x);
            }
            if (typeof this.y_data[0] == "string") {
                this.minVal_y = 0;
            }
            else {
                for (let i = 1; i < this.all_y_data.length; i++) {
                    let a = this.max(this.all_y_data[i]);
                    if (a > max_y) {
                        max_y = a;
                    }
                }
                this.maxVal_y = Utils.myMath.myRound(max_y);
            }
            // this.maxVal_x = (typeof this.all_x_data[0] == "string") ? this.amountOfElements : 
            //     Utils.myMath.myRound(this.max(this.all_x_data));
            // this.maxVal_y = Utils.myMath.myRound(this.maxVal_y)
            // this.maxVal_y = (typeof this.all_y_data[0] == "string") ? this.amountOfElements :  
            // Utils.myMath.myRound(this.max(this.all_y_data));
        }
        arrayCopy(a) {
            let res = [];
            for (let i = 0; i < a.length; i++) {
                res[i] = a[i];
            }
            return res;
        }
        addData(dataJSON) {
            //add parser.ts
            Utils.JSONparser.parse(dataJSON);
            this.data = Utils.JSONparser.data;
            this.description = Utils.JSONparser.description;
            ChartData.Data.description = this.description;
            this.x_data = Utils.JSONparser.x_data;
            this.y_data = Utils.JSONparser.y_data;
            this.amountOfElements = Utils.JSONparser.amountOfElements;
            //let all_len = this.all_x_data;
            this.all_x_data.push(this.arrayCopy(this.x_data));
            this.all_y_data.push(this.arrayCopy(this.y_data));
            // console.log(this.all_x_data,this.all_y_data);
            // console.log(typeof(typeof this.x_data[0]));
            // console.log(this.maxVal_x, this.maxVal_y);
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
        min(d) {
            // let n = this.x_data.map(x => Number.parseInt(x));
            let m = d[0];
            for (let i = 1; i < this.amountOfElements; i++) {
                if (d[i] < m) {
                    m = d[i];
                }
            }
            return m;
        }
        setGrid(theGrid) {
            this.theGrid = theGrid;
        }
        addGrid() {
            let myGrid;
            switch (this.theGrid) {
                case Grid.Grids.Horizontal: {
                    myGrid = new Grid.HorizontalGrid(this.width, this.height, this.startPoint, this.int2);
                    myGrid.draw();
                    break;
                }
                case Grid.Grids.Vertical: {
                    myGrid = new Grid.VerticalGrid(this.width, this.height, this.startPoint, this.int1);
                    myGrid.draw();
                }
                case Grid.Grids.None: {
                    myGrid = null;
                    break;
                }
                case Grid.Grids.Combined: {
                    myGrid = new Grid.CombinedGrid(this.width, this.height, this.startPoint, this.int1, this.int2);
                    myGrid.draw();
                }
                default: {
                    break;
                }
            }
        }
    }
    Charts.Chart = Chart;
})(Charts || (Charts = {}));
var Charts;
(function (Charts) {
    class ScatterChart extends Charts.Chart {
        constructor(startPoint, width = 300, height = 300) {
            super(startPoint, width, height);
            this.colorGenerator = new Utils.ColorGenerator();
        }
        addToCanvas() {
            ChartData.Data.names = Utils.JSONparser.names;
            let legend = new Legend.Legend(this.startPoint, this.width, this.height, Legend.Location.Right);
            legend.add();
            this.startPoint.plus(new Figures.Point(Parameters.Parameters.left_margin, Parameters.Parameters.bottom_margin));
            let xAxis = new Axises.XAxis(this.width, this.maxVal_x, this.minVal_y);
            xAxis.setStartCoordinate(this.startPoint);
            xAxis.addAxisName();
            xAxis.addLabel();
            xAxis.addToCanvas();
            let yAxis = new Axises.YAxis(this.height, this.maxVal_y, this.minVal_y);
            yAxis.setStartCoordinate(this.startPoint);
            yAxis.addAxisName();
            yAxis.addLabel();
            yAxis.addToCanvas();
            this.find_maxVal();
            this.find_minVal();
            this.c_x = Math.pow(10, Utils.myMath.countDigOrder(this.maxVal_x - this.minVal_x) - 2);
            this.c_y = Math.pow(10, Utils.myMath.countDigOrder(this.maxVal_y - this.minVal_y) - 2);
            this.a_x = (this.maxVal_x - this.minVal_x) / this.c_x;
            this.a_y = (this.maxVal_y - this.minVal_y) / this.c_y;
            this.int1 = this.width / this.a_x;
            this.int2 = this.height / this.a_y;
            this.addGrid();
            for (let i = 0; i < this.all_x_data.length; i++) {
                this.addDots(i);
            }
        }
        addDots(j) {
            context.save();
            let color = this.colorGenerator.next();
            for (let i = 0; i < this.amountOfElements; i++) {
                let d = new Figures.Dot(new Figures.Point((this.all_x_data[j][i] - this.minVal_x) * this.int1 / this.c_x + this.startPoint.x, -(this.all_y_data[j][i] - this.minVal_y) * this.int2 / this.c_y + this.startPoint.y), color);
                d.draw();
                d.justStroke();
            }
            context.restore();
        }
    }
    Charts.ScatterChart = ScatterChart;
})(Charts || (Charts = {}));
var Charts;
(function (Charts) {
    class LineChart extends Charts.ScatterChart {
        addToCanvas() {
            super.addToCanvas();
            this.colorGenerator.refresh();
            for (let i = 0; i < this.all_x_data.length; i++) {
                this.addLines(i);
            }
        }
        addLines(n) {
            Utils.Sorter.sortAsc_linechart(this.all_x_data[n], this.all_y_data[n]);
            let color = this.colorGenerator.next();
            for (let i = 0; i < this.all_x_data[n].length; i++) {
                this.drawLine(new Figures.Point((this.all_x_data[n][i] - this.minVal_x) * this.int1 / this.c_x + this.startPoint.x, -(this.all_y_data[n][i] - this.minVal_y) * this.int2 / this.c_y + this.startPoint.y), new Figures.Point((this.all_x_data[n][i + 1] - this.minVal_x) * this.int1 / this.c_x + this.startPoint.x, -(this.all_y_data[n][i + 1] - this.minVal_y) * this.int2 / this.c_y + this.startPoint.y), 3, color);
            }
        }
        drawLine(start, finish, lineWidth, color) {
            context.save();
            context.beginPath();
            // context.arc(start.x, start.y, 1, 0, Math.PI * 2);
            context.moveTo(start.x, start.y);
            context.lineTo(finish.x, finish.y);
            context.lineWidth = lineWidth + 2;
            context.strokeStyle = "black";
            context.stroke();
            context.lineWidth = lineWidth;
            context.strokeStyle = color;
            context.stroke();
            context.restore();
        }
    }
    Charts.LineChart = LineChart;
})(Charts || (Charts = {}));
const canvas = document.getElementById('chart');
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
let data = '{"description":{"name" : "set1","x":"sales", "y":"temp"},"data":[{"sales":20, "temp":11}, {"sales":211, "temp":13}, {"sales":110, "temp":10}]}';
let data1 = '{"description":{"name" : "set2","x":"sales", "y":"temp"},"data":[{"sales":209, "temp":18}, {"sales":10, "temp":1},{"sales":150, "temp":13}, {"sales":110, "temp":15}]}';
let data2 = '{"description":{"name" : "set3","x":"sales", "y":"temp"},"data":[{"sales":100, "temp":10}, {"sales":24, "temp":8},{"sales":110, "temp":13}, {"sales":180, "temp":17}]}';
// let chart = new Charts.ScatterChart(new Figures.Point(100,500));
// chart.addData(data);
// context.save();            
// //chart.minVal_x = 100;
// //chart.minVal_y = 10;
// chart.setGrid(Grid.Grids.Combined);
// chart.addToCanvas();
let zhopa = new Charts.LineChart(new Figures.Point(100, 500));
zhopa.addData(data);
zhopa.addData(data1);
zhopa.addData(data2);
zhopa.addToCanvas();
//# sourceMappingURL=main.js.map