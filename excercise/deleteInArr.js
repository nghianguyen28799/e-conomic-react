var a = [1, 4, 7, 19, 30]
const index = 3
for( var i=0; i < a.length ; i ++){
    if( i == index){
        a[i] = a[i+1]
        a.pop()
    }
}
console.log(a)
