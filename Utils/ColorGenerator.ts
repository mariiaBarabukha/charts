namespace Utils{
    export class ColorGenerator{
        private currentColor:number = 0;
        private basic_colors = [0xFF0000, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF00FF];
        private colors = [0xFF0000, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF00FF];
        private counter = 0;

        public next(){
            
            if(this.counter >= this.colors.length-1){                    
                this.counter = this.counter % 5;
                   this.colors.forEach(c => {
                    c/=2;
                });
             }
                this.currentColor = this.colors[this.counter];
                ++this.counter;
            
            let hexcolor:string = this.currentColor.toString(16).toUpperCase();
            let zeroSToAdd:number = 6-hexcolor.length;
            for(let i:number = 0; i<zeroSToAdd; ++i){
                hexcolor="0"+hexcolor;
            }

            return "#"+hexcolor;
        }

        public refresh(){
            for(let i:number = 0; i < this.colors.length; i++){
                this.colors[i] = this.basic_colors[i];
            }
            this.counter = 0;
        }
    }
}