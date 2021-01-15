namespace Utils{
    
    export class myMath{

        public static myRound(num:number){

            let neg:boolean = false;

            if(num<0){
                num = num*(-1)
                neg = true;
            }
            if(num<10 && num>0){
                return 10;
            }
            if(num>-10 && num<0){
                return -10;
            }

            let digOrder:number = this.countDigOrder(num);
            
            if(digOrder == 2 && num%10 > 0){
                num = num - num%10 + 10;
            }

            if(num % Math.pow(10,digOrder-2) != 0){
                num = (num/Math.pow(10,digOrder-2) + 1)* Math.pow(10,digOrder-2) - num % Math.pow(10,digOrder-2);
            }

            return neg? -num: num;

        }

        public static countDigOrder(num:number): number{
            let counter:number = 1;

            while(num / 10 >= 1){
                num /=10;
                ++counter;
            }

            return counter;
        }
    }
}