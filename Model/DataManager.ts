namespace ChartData{
    export class Data{
        filename:string;
        text:string;

       static description:object = Utils.JSONparser.description;
       static names:string[] = [];

        constructor(filename:string){
            this.filename = filename;
        }

        public readJSON(){
            let file = new FileReader();
            //this.text = file.readAsText(new File());
        }

    }
}