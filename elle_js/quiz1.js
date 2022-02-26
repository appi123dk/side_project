// 사칙연산 기능별 함수 
const sum = (a,b) => a + b;
const substract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;
const remain = (a,b) => a % b;

// 사칙연산 참고 함수
const calculator = (command, a, b) => {
	switch(command){
		case '+':
			return sum(a,b);
		case '-':
			return substract(a, b);
		case '*':
			return multiply(a, b);
		case '/':
			return divide(a, b);
		case '%':
			return remain(a,b);
		default:
			return '연산자를 잘못 입력하셨습니다';
	}
}

console.log(calculator('*', 2, 5));