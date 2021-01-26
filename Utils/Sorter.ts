namespace Utils{
    export class Sorter{
       
        private static partition(items:Array<any>, y:Array<any>, left:number, right:number) {
            var pivot   = items[Math.floor((right + left) / 2)], //middle element
                i       = left, //left pointer
                j       = right; //right pointer
            while (i <= j) {
                while (items[i] < pivot) {
                    i++;
                }
                while (items[j] > pivot) {
                    j--;
                }
                if (i <= j) {
                    this.swap(items,y, i, j); //sawpping two elements
                    i++;
                    j--;
                }
            }
            return i;
        }
        
        private static quickSort(items:Array<any>,y:Array<any>, left:number, right:number) {
            var index;
            if (items.length > 1) {
                index = this.partition(items,y, left, right); //index returned from partition
                if (left < index - 1) { //more elements on the left side of the pivot
                    this.quickSort(items, y,left, index - 1);
                }
                if (index < right) { //more elements on the right side of the pivot
                   this. quickSort(items, y,index, right);
                }
            }
            return items;
        }
        public static sortAsc_linechart(items:Array<any>, y_data:Array<any>){
            this.quickSort(items,y_data, 0, items.length-1);
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