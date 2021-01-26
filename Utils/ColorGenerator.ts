namespace Utils{
    export class ColorGenerator{
        private currentColor:number = 0;
        private basic_colors = [0xFF0000, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF00FF];
        private colors = [0xFF0000, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF00FF];
        private counter = 0;

        public next(){
            if(this.currentColor == 0){
                this.currentColor = 0xFF0000;

            }else{
                this.counter++;
                if(this.counter >= this.colors.length-1){                    
                    this.counter = this.counter % 5;
                    this.colors.forEach(c => {
                        c/=2;
                    });
                }
                this.currentColor = this.colors[this.counter];
            }

            return "#"+this.currentColor;
        }

        public refresh(){
            for(let i:number = 0; i < this.colors.length; i++){
                this.colors[i] = this.basic_colors[i];
            }
            this.counter = 0;
        }
    }
}