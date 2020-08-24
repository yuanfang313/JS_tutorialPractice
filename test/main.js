
let twoSum = function(nums, target) {
    let arr = [];
    for(let i = 0; i < nums.length; i++){
        for(let g = i + 1; g < nums.length; g++){
            let sum = nums[i] + nums[g];
            if(sum == target){
                arr.push(i);
                arr.push(g);
            }   
        }
    }
    return arr; 
};
let nums = [2, 7, 11, 90]
let targetIndices = twoSum(nums, 9);
console.log(targetIndices);


  

