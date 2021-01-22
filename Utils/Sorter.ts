namespace Utils{
    export class Sorter{
        public static sortAsc_linechart(x_data:Array<any>, y_data:Array<any>){
            this.partition(x_data, y_data, 0, x_data.length-1);
        }

        private static partition(items:Array<any>, y:Array<any>, 
            left:number, right:number) {
            let pivot   = items[Math.floor((right + left) / 2)],
                i       = left,
                j       = right;
            while (i <= j) {
                while (items[i] < pivot) {
                    i++;
                }
                while (items[j] > pivot) {
                    j--;
                }
                if (i <= j) {
                    this.swap(items, y, i, j);
                    i++;
                    j--;
                }
            }
            return i;
        }

        private static swap(items:Array<any>, y:Array<any>,
             firstIndex:number, secondIndex:number){
            let temp = items[firstIndex];
            items[firstIndex] = items[secondIndex];
            items[secondIndex] = temp;

            temp = y[firstIndex];
            y[firstIndex] = y[secondIndex];
            y[secondIndex] = temp;
        }
    }
}