namespace ChartData{
    export class Data{
        filename:string;
        text:string;

        constructor(filename:string){
            this.filename = filename;
        }

        public readJSON(){
            let file = new FileReader();
            //this.text = file.readAsText(new File());
        }

    }
}