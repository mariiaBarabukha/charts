namespace Models{
    export class Model{

        private static model:Model;

        public static getModel(){
            if(this.model == null){
                this.model = new Model();
            }

            return this.model;
        }

        private static context: CanvasRenderingContext2D;
        static canvas: HTMLCanvasElement;
        static def_lineWidth:number = 1;
        static def_color:string = "black";

        static def_arrowHeadWidth = 5;
        static def_arrowHeadHeight = 10;

        public static setContext(context: CanvasRenderingContext2D){
            this.context = context;
        }

        public static getContext(){
            return this.context;
        }

        private constructor(){

        }


    }
}