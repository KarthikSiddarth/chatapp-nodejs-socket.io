let body = document.body

function newElement (tag, attr, text) {
	let ele = document.createElement(tag)
	if (attr) {
		for (let i in attr) {
			ele.setAttribute(i, attr[i])
		}
	} 
	if (text) {
		ele.textContent = text
	}
	return ele
}

function appChildren (eleObj) {
	if (eleObj) {
		for (let i in eleObj) {
			let parentEle = eleObj[i].shift()
			for (let j of eleObj[i]) {
				parentEle.appendChild(j)
			}
		}
	}
}

let signUpDiv = newElement('div', {'id': 'signUp'})
let newNameLabel = newElement('label', {'for': 'newName'}, 'Name: ')
let newName = newElement('input', {'placeholder': 'Enter your name', 'id': 'newName'})
let passLabel = newElement('label', {'for': 'password'}, 'Password: ')
let password = newElement('input', {'placeholder': 'Enter your password', 'id': 'password'})
let confirmLabel = newElement('label', {'for': 'confirmPassword'}, 'Confirm Password: ')
let confirmPassword = newElement('input', {'placeholder': 'Enter your password again', 'id': 'confirmPassword'})
let signUpBtn = newElement('button', {'id': 'signUpBtn'}, 'sign-up')

let eleObj = {body: [body, signUpDiv], signUpDiv: [signUpDiv, newNameLabel, passLabel, confirmLabel], newName: [newNameLabel, newName], passLabel: [passLabel, password], confirmLabel: [confirmLabel, confirmPassword], signUpBtn: [signUpDiv, signUpBtn]}

appChildren(eleObj)
