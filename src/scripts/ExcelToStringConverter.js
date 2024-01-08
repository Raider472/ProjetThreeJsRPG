function parser(stringSerie) {
    let arrayString = stringSerie.split('');
    let result = []
    for(let i = 0; i < arrayString.length; i++) {
        if(arrayString[i] != ' ' && arrayString[i] != '\t') {
            if(arrayString[i] === '.') {
                result.push('')
            }
            else{
                result.push(arrayString[i])   
            }
        }
    }
    return result
}
let mots = ".	.	.	.	.	.	.	.	.	.	.	.	.	.	.	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	.	.	.	.	.	.	.	.	.	.	."
let test = parser(mots)
console.log(test, "result converser")