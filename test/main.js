const walkArr = ['w']

function isValidWalk(walk) {
    let xSum = 0;
    let ySum = 0;
    for (step of walk) {
        switch (step) {
            case 'n':
                ySum++;
                break;
            case 's':
                ySum--;
                break;
            case 'e':
                xSum++;
                break;
            case 'w':
                xSum--;
                break;
        }
    }
    console.log(xSum, ySum);
    if (xSum === 0 && ySum === 0) return true;

    return false;
}

console.log(isValidWalk(walkArr));