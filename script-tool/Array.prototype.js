//数组的冒泡排序
Array.prototype.bubbleSort = function() {

  let i, j;

  for (i = 1; i < this.length; i++) { //表示本次是第i次遍历

    let changed = false;

    for (j = 0; j < this.length - i; j++) { //访问序列为arr[0:length-i]

      if (this[j] > this[j + 1]) { //发现前一个数大于后一个时，互换位置

        [this[j], this[j + 1]] = [this[j + 1], this[j]];

        changed = true;

      }

    }

    if (!changed) { //如果本轮遍历没有发现位置调整，结束排序函数

      break;

    }

  }

};

//数组的选择排序
Array.prototype.selectSort = function() {

  let i, j;

  for (i = 1; i < this.length; i++) { //表示本次是第i次遍历

    let maxIndex = 0;

    for (j = 0; j <= this.length - i; j++) { //访问子序列为arr[0:this.length-i]

      if (this[j] > this[maxIndex]) { //当前值大于当前最大值时，记录索引

        maxIndex = j;

      }

    }

    //将子数组最大值索引的值，与子数组末尾的值互换

    [this[this.length - i], this[maxIndex]] = [this[maxIndex], this[this.length - i]]

  }

};
//数组的插入排序
Array.prototype.insertSort = function() {

  let i, j;

  for (i = 1; i < this.length; i++) { //i表示当前要向前插入的数字的索引，从1(即第2个数)开始前插

    let val = this[i]; //记录当前要前插的数的大小

    /*
     
     * 用指针j来遍历第i个数字前面的，已经排好序的子数组。当j没有指到头，并且j的数字大于要插入的数字时，说明
     
     * j还要向前遍历，直到发现一个比要插入数字小的位置pos，然后将这个数字插到pos+1处。如果j已经指到头了，
     
     * 到了-1了还没有找到比当前数字小的位置，就把当前数字放在索引0处。
     
     * */

    for (j = i - 1; j >= 0 && this[j] > val; j--) {

      this[j + 1] = this[j];

    }

    this[j + 1] = val;

  }

};
//shell排序
const {
  floor
} = Math;


//这个和插入排序相同，只不过加了step

Array.prototype.shellInsertSort = function(startIndex, step) {

  let i, j;

  for (i = startIndex + step; i < this.length; i += step) {

    let val = this[i];

    for (j = i - step; j >= 0 && this[j] > val; j -= step) {

      this[j + step] = this[j];

    }

    this[j + step] = val;

  }

};


Array.prototype.shellSort = function() {

  let i, step;

  for (step = floor(this.length / 2); step > 0; step = floor(step / 2)) {

    for (i = 0; i < step; i++) {

      this.shellInsertSort(i, step);

    }

  }

};
//合并排序
const {
  min
} = Math;


function merge(arr1, arr2, ) {

  let arr = [];

  let i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {

    arr1[i] < arr2[j] ? arr.push(arr1[i++]) : arr.push(arr2[j++]);

  }

  return i < arr1.length ? arr.concat(arr1.slice(i)) : arr.concat(arr2.slice(j))

}


Array.prototype.mergeSort = function() {

  let groupSize, i, secondPartSize, firstPart, secondPart, totalSize;

  //最初合并时，每组的大小仅为1，然后将组的大小乘以2。

  for (groupSize = 1; groupSize < this.length; groupSize *= 2) {

    for (i = 0; i < this.length; i += 2 * groupSize) {

      //前半段大小一定是groupSize，后半段则不一定

      secondPartSize = min(groupSize, this.length - i - groupSize);

      totalSize = secondPartSize + groupSize;

      //截取前后部分数组，将其排序

      firstPart = this.slice(i, i + groupSize);

      secondPart = this.slice(i + groupSize, i + groupSize + secondPartSize);

      this.splice(i, totalSize, ...merge(firstPart, secondPart));

    }

  }

};
//自然排序
function merge(arr1, arr2) {

  let arr = [],
    i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {

    arr.push(arr1[i] < arr2[j] ? arr1[i++] : arr2[j++])

  }

  return arr.concat(i < arr1.length ? arr1.slice(i) : arr2.slice(j));

}


function getSortedArrList(arr) {

  //记录下已经原本就是从小到大顺序的子数组

  let sortedArrList = [];

  let childArr = [arr[0]];

  for (let i = 1; i < arr.length; i++) {

    //当前值小于上一个值时，将childArr加入sortedArrList中，创建新的childArr，并加入当前值。

    if (arr[i] < arr[i - 1]) {

      sortedArrList.push(childArr);

      childArr = [arr[i]];

    }

    //否则，将当前值加入到childArr中
    else {

      childArr.push(arr[i]);

    }

  }

  sortedArrList.push(childArr);

  return sortedArrList;

}


Array.prototype.naturalMergeSort = function() {

  let sortedArrList = getSortedArrList(this); //获取原本从小到大顺序的子数组


  while (sortedArrList.length > 1) { //当还有两个及以上的数组没合并完成时

    let newSortedArrList = [];

    for (let i = 0; i < sortedArrList.length; i += 2) {

      if (i !== sortedArrList.length - 1) {

        newSortedArrList.push(merge(sortedArrList[i], sortedArrList[i + 1]));

      } else {

        newSortedArrList.push(sortedArrList[i]);

      }

    }

    sortedArrList = newSortedArrList;

  }

  this.splice(0, this.length, ...sortedArrList[0]);

};

//基数排序
const {
  max
} = Math;


function initBarrel() {

  let barrel = [];

  for (let i = 0; i < 10; i++) {

    barrel[i] = [];

  }

  return barrel;

}


function radixSort(arr) {

  let barrel = initBarrel();

  let figureNum = max(...arr).toString().length; //计算最大的数字的位数

  arr = arr.map(num => num.toString().padStart(figureNum, '0')); //将数字填充到figureNum位

  for (let i = 0; i < figureNum; i++) {

    let index = figureNum - i - 1; //本次根据第index位来选择放入哪个桶

    arr.forEach(numStr => { //将填充过的数组放入桶中

      let num = Number(numStr[index]);

      barrel[num].push(numStr);

    });

    arr = barrel.reduce((prevArr, curArr) => prevArr.concat(curArr), []); //汇总barrel中的数

    barrel = initBarrel(); //初始化barrel

  }

  return arr.map(num => Number(num)); //最终转为数字形式

}


Array.prototype.radixSort = function() {

  let arr = radixSort(this);

  this.splice(0, this.length, ...arr);

};
//基数排序，从高位开始
const {
  max
} = Math;


function initBarrel() {

  let barrel = [];

  for (let i = 0; i < 10; i++) {

    barrel[i] = [];

  }

  return barrel;

}


//判断当前桶中是否只有唯一值 有的桶中可能只有一种值，但是有多个重复项

function unique(barrel) {

  return new Set(barrel).size <= 1;

}


Array.prototype.radixSort = function() {

  let result = [];

  let figureNum = max(...this).toString().length;

  this.splice(0, this.length, ...this.map(num => num.toString().padStart(figureNum, '0')));

  radixGroup(this, 0, figureNum, result);

  this.splice(0, this.length, ...result.map(numStr => Number(numStr)));

};


function radixGroup(group, index, figureNum, result) { //输入的group是一组numStr，index是当前分桶依据第几位数

  if (index < figureNum) {

    let barrel = initBarrel();

    group.forEach(numStr => {

      let idx = Number(numStr[index]);

      barrel[idx].push(numStr);

    });


    barrel.forEach(subBarrel => {

      if (unique(subBarrel)) {

        subBarrel.forEach(num => {

          result.push(num);

        })

      } else {

        radixGroup(subBarrel, index + 1, figureNum, result);

      }

    })

  }

}；

//快速排序
const {
  floor,
  random
} = Math;


function randomIndex(start, end) {

  return floor(random() * (end - start + 1)) + start;

}


function partition(arr, start, end) {

  let index = randomIndex(start, end);

  [arr[start], arr[index]] = [arr[index], arr[start]];


  let value = arr[start];


  while (start < end) {

    while (start < end && arr[end] > value) end--;

    arr[start] = arr[end];

    while (start < end && arr[start] < value) start++;

    arr[end] = arr[start];

  }


  arr[start] = value;

  return start;

}


function quickSort(arr, start, end) {

  if (start < end) {

    let pivot = partition(arr, start, end);

    quickSort(arr, start, pivot - 1);

    quickSort(arr, pivot + 1, end);

  }

}


Array.prototype.quickSort = function(asc = true) {

  quickSort(this, 0, this.length - 1, asc)

};
//堆排序
const {
  floor,
  max
} = Math;


function getBiggestNodeIndex(...nodes) {

  return nodes.indexOf(max(...nodes));

}


//将arr从0开始，长度为length的子数组构建为堆

function constructHeap(arr, length) {

  let adjusted = true; //adjusted来标识本次堆是否作出了调整，若未调整说明堆已构建完毕

  while (adjusted) {

    adjusted = false;

    for (let i = 0; i < floor(length / 2); i++) {

      //当只有左节点时

      if (2 * i + 2 === length) {

        //当父节点比左节点小的时候

        if (arr[i] < arr[2 * i + 1]) {

          //互换

          [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];

          adjusted = true;

        }

      }

      //当同时有左节点和右节点时
      else {

        //判断三个中最大的节点

        let biggestNodeIndex = getBiggestNodeIndex(arr[i], arr[2 * i + 1], arr[2 * i + 2]);

        //若父节点不是最大的，则和最大的交换

        //如果biggestNodeIndex为0，说明自己最大，为1，说明左节点大，为2，说明右节点大

        switch (biggestNodeIndex) {

          case 0:

            break;

          case 1:

            [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];

            adjusted = true;

            break;

          case 2:

            [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];

            adjusted = true;

            break;

        }

      }

    }

  }

}


function heepSort(arr) {

  //只将arr从0开始，长度为length的子数组构建成大根堆

  let length = arr.length;

  while (length > 1) {

    constructHeap(arr, length);

    [arr[0], arr[length-- - 1]] = [arr[length - 1], arr[0]];

  }

}


Array.prototype.heepSort = function() {

  heepSort(this);

};