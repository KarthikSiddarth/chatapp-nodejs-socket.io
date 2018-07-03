function prcsSignUp () {
	let name = newName.value	
	let passBox1 = password.value
	let passBox2 = confirmPassword.value
	if (!(name.length && passBox1.length && passBox2.length)) {
		console.log('form is not complete')
	} else if (passBox1 !== passBox2) {
		//send data
		console.log(name, 'false')
	} else {
		// inform user that its reenter 
		console.log(name, 'true')
	}
}

function prcsSignIn () {
	let name = nameBox.value
	let passBox = password2.value
	if (!(name.length && passBox.length)) {
		console.log('form is not complete')
	} else {
		// send data
	}
}

let signUpDiv = newElement('div', {'id': 'signUp'})
let signUpHead = newElement('h1', {'id': 'signUpHead'}, 'Sign up')
let newNameLabel = newElement('label', {'for': 'newName'}, 'Name: ')
let newName = newElement('input', {'placeholder': 'Enter your name', 'id': 'newName'})
let passLabel = newElement('label', {'for': 'password'}, 'Password: ')
let password = newElement('input', {'placeholder': 'Enter your password', 'id': 'password', 'type': 'password'})
let confirmLabel = newElement('label', {'for': 'confirmPassword'}, 'Confirm Password: ')
let confirmPassword = newElement('input', {'placeholder': 'Enter your password again', 'id': 'confirmPassword', 'type': 'password'})
let signUpBtn = newElement('button', {'id': 'signUpBtn'}, 'sign-up')

let signInDiv = newElement('div', {'id': 'signIn'})
let signInHead = newElement('h1', {'id': 'signInHead'}, 'Sign in')
let nameLabel = newElement('label', {'for': 'name'}, 'Name: ')
let nameBox = newElement('input', {'placeholder': 'Enter your account name', 'id': 'name'})
let passLabel2 = newElement('label', {'for': 'password2'}, 'Password: ')
let password2 = newElement('input', {'placeholder': 'Enter your password', 'id': 'password2', 'type': 'password'})
let signInBtn = newElement('button', {'id': 'signInBtn'}, 'sign-in')

let signUpPart = {body: [body, signUpDiv], signUpDiv: [signUpDiv, signUpHead, newNameLabel, passLabel, confirmLabel], newName: [newNameLabel, newName], passLabel: [passLabel, password], confirmLabel: [confirmLabel, confirmPassword], signUpBtn: [signUpDiv, signUpBtn]}

let signInPart = {body: [body, signInDiv], signInDiv: [signInDiv, signInHead, nameLabel, passLabel2], name: [nameLabel, nameBox], passLabel2:[passLabel2, password2], signInBtn: [signInDiv, signInBtn]}

let evntObj = {signUpBtn: [signUpBtn, 'click', prcsSignUp], signInBtn: [signInBtn, 'click', prcsSignIn]}

appChildren(signUpPart)
appChildren(signInPart)

addListener(evntObj)
