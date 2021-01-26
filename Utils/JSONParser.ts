namespace Utils{
    export class JSONparser{
        static data:Array<object>;
        static description:object;
        static amountOfElements:number = 0;
        static x_data:Array<any> = [];
        static y_data:Array<any> = [];

        public static parse(dataJSON:string){
            let data = JSON.parse(dataJSON);           

            this.data = data["data"];
            //console.log(this.data);

            this.description = data["description"];

            this.amountOfElements = this.data.length;
            
            

            for(let i:number = 0; i < this.amountOfElements; i++){
                this.x_data[i] = (this.data[i])[this.description["x"]];
                this.y_data[i] = (this.data[i])[this.description["y"]];
               
            }

            //console.log(this.x_data, this.y_data, this.x_data.length);
            

        }

        
    }
}