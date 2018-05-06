
// data base //
var db = [
	{
		id: 1,
		name: 'Nenad',
		deposite: 15000,
		card: 'Visa'
	},{
		id: 2,
		name: 'Dejan',
		deposite: 25000,
		card: 'Master'
	}
]


// selecting part of page for showing data
var tbody = document.getElementsByTagName('tbody')[0];



// selecting of basic buttons

var allAccounts = document.getElementById('accBtn');
var newClient = document.getElementById('addBtn');
var editClient = document.getElementById('delBtn');

// selecting main page and form

var mainPage = document.getElementById('accounts');
var formInput = document.getElementById('form');
mainPage.style.display = 'none';

// selecting input fields in form 
var inputId = document.getElementById('idUser');
var inputName = document.getElementById('name');
var inputDeposite = document.getElementById('depo');
var inputCard = document.getElementById('cCard');

// selecting buttons for adding new clients to base

var addNewClient = document.getElementById('submit');
addNewClient.addEventListener('click', addAcc);


// show main page //
showAccounts();

// adding events to buttons

allAccounts.addEventListener('click', showAccounts);
newClient.addEventListener('click', addNewAccount);
editClient.addEventListener('click', editAccount);

// main page view //
function showAccounts(){
	mainPage.style.display = "block";
	formInput.style.display = 'none';
	var text = '';
for(var i = 0; i < db.length; i++){
	text += '<tr>';
	text += '<td>'+ db[i].id +'</td>';
	text += '<td>'+ db[i].name +'</td>';
	text += '<td>'+ db[i].deposite +'</td>';
	text += '<td>'+ db[i].card +'</td>';
	text += '</tr>';
}	
	tbody.innerHTML = text;

}
// page for adding new clients
function addNewAccount(){
	mainPage.style.display = "none";
	formInput.style.display = 'block';
	let num = parseInt(db[db.length - 1].id);
	if((db.length + 1) === num){
		inputId.value = num + 1;
		inputName.value = "";
		inputDeposite.value = "";
		inputCard.value = "";
	}else if((db.length + 1) < num){
		inputId.value = (num - 1) + 2;
		inputName.value = "";
		inputDeposite.value = "";
		inputCard.value = "";
	}else{

		inputId.value = db.length + 1;
		inputName.value = "";
		inputDeposite.value = "";
		inputCard.value = "";
		
	}
}	

	addNewClient.innerHTML = 'Add user';



function addAcc(){
	if(this.innerHTML === "Change user data"){
		// var myDb = JSON.parse(localStorage.db);
		console.log(inputId.value);
		console.log(db);
		for(var m = 0; m < db.length; m++){
			if(db[m].name === inputName.value){	
				console.log(true);
				db[m].name = inputName.value;
				db[m].deposite = inputDeposite.value;
				db[m].card = inputCard.value;
			}
		}
		showAccounts();

	}else{

				var newUser = {};
				newUser.id = inputId.value;
				newUser.name = inputName.value;
				newUser.deposite = inputDeposite.value;
				newUser.card = inputCard.value;
				db.push(newUser);
				localStorage.setItem('db', JSON.stringify(db));
				showAccounts();
   				inputId.value = "";
				inputName.value = "";
				inputDeposite.value = "";
				inputCard.value = "";
			}
			
		
		
}


// page for editing & erasing clients //
function editAccount(){
	formInput.style.display = 'none';
	mainPage.style.display = "block";
	var text = "";
	for(var i = 0; i < db.length; i++){
		text += '<tr>';
		text += '<td>'+ db[i].id +'</td>';
		text += '<td>'+ db[i].name +'</td>';
		text += '<td>'+ db[i].deposite +'</td>';
		text += '<td>'+ db[i].card +'</td>';
		text += '<td><button data-edit="'+ (i + 1) +'" class="btn btn-success change">Edit</button></td>';
		text += '<td><button id="'+ i +'"class="btn btn-danger delete">Delete</button></td>';
		text += '</tr>';
	}
	tbody.innerHTML = text;
	var editUser = document.getElementsByClassName('change');
	var deleteUser = document.getElementsByClassName('delete');
	

	for(var y = 0; y < db.length; y++ ){
		editUser[y].addEventListener('click', changeUserData);
	}
	for(var x = 0; x < db.length; x++){
		deleteUser[x].addEventListener('click', deleteUserAccount);
	}

}
var position;
// saving changes of clients data to db //

function changeUserData(){
		
		position = (this.getAttribute('data-edit')) - 1;

		inputId.value = db[position].id;
		inputName.value = db[position].name;
		inputDeposite.value = db[position].deposite;
		inputCard.value = db[position].card;
		formInput.style.display = 'block';
		mainPage.style.display = 'none';
		addNewClient.innerHTML = 'Change user data';
	
}



// erasing clients from page

function deleteUserAccount(){
	db.splice(this.id,1);
	showAccounts();

}
