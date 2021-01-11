const canvas = <HTMLCanvasElement>document.getElementById('chart');
const context = canvas.getContext('2d');

context.save();
context.beginPath();
context.moveTo(10,50);
context.lineTo(100,50);
context.strokeStyle = "red";
context.stroke();
context.restore();