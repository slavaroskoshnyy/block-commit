const formNode = document.querySelectorAll('.comment')
const clearBtnNode = document.querySelector('#comment-clear');
const commntFielOutNode = document.querySelector('#commen-field');
const fieldsNode = document.querySelectorAll('.form-kontrol')
const commentNameNode = document.querySelector('#comment-name');
const commentBodyNode = document.querySelector('#comment-body');
const errorMessagNode = document.querySelectorAll('.js-comment-error');
const outMessagNode = document.querySelector('#commen-field')

let comments = [];
loadComments();
valideitionFocus(commentNameNode);
valideitionFocus(commentBodyNode);


function valideitionFocus(node){
	node.onblur = function() {
	if (!this.value) {
		this.classList.add('error');
		this.nextElementSibling.innerHTML = 'Не верный ввод'
	}
 };

 node.oninput = function() {
	if (this.classList.contains('error')) {
		this.nextElementSibling.innerHTML = ''
	  	this.classList.remove('error');
	}
 };
};

function valideition(){
	let emptiImputs = Array.from(fieldsNode).filter(input=>input.value === '');

	fieldsNode.forEach(function(input){
		if (input.value === ''){
			input.classList.add('error');
			input.nextElementSibling.innerHTML = 'Заполните поле'	
		} else {
			input.nextElementSibling.innerHTML = ''
			input.classList.remove('error');
		};
	});

	if (emptiImputs.length !== 0){
		return click;	
	}
}

function saveComments() {
	localStorage.setItem('comments', JSON.stringify(comments))
};

function loadComments() {
	if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
	showComments();
}

function showComments() {
	const commntFielOutNode = document.querySelector('#commen-field');
	let out = '';

	comments.forEach(function(item){
		out += `<div class="out-put">
					<p class="text-out">${timeConverter(item.time)}</p>	
					<p class="text-out">${item.name}</p>
					<p class="text-out">${item.body}</p>
					<div class="count" hidden>1</div>
					<button class="like"></button>
					<button class="remove-button"></button>			
					</div>`;
	});
	commntFielOutNode.innerHTML = out;
};

 const outPut = document.querySelectorAll('.out-put')

function timeConverter(UNIX_timestamp) {
	let a = new Date(UNIX_timestamp * 1000);

	let diffMs = new Date() - a;
   let diffSec = Math.round(diffMs / 1000);
   let diffMin = diffSec / 60;
   let diffHour = diffMin / 60;
  	let diffDay = diffHour / 24;

	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = String(a.getHours()).padStart(2, '0');
	let min = String(a.getMinutes()).padStart(2, '0');
	let time = `${date} ${month} ${year} ${hour}:${min}`;

	if (diffDay < 1){
		return `Сегодня, ${hour}:${min}`
	}
	if (diffDay < 2){
		return `Вчера, ${hour}:${min}`
	}
	return time;
};

document.getElementById('comment-add').onclick = function click(){
	event.preventDefault();

	valideition()

	let xButton = document.createElement("button");

	const commet = {
		name: commentNameNode.value,
		body: commentBodyNode.value,
		time: Math.floor(Date.now()/1000),
		xButton
	}
	
	commentBodyNode.value = '';
	commentNameNode.value = '';

	comments.push(commet);
	saveComments();
	showComments();

};

// outPut.forEach(elem => {
// 	const index = [...document.querySelectorAll('.out-put')].indexOf(elem) //! проверка индекса
// 	console.log(index);
// 	console.log(elem);

// });

outMessagNode.addEventListener('click', function(){
	if (event.target.className != 'remove-button') return;
	
	let coment = event.target.closest('.out-put');
	coment.remove();
});

// const counts = document.querySelectorAll('.count')
// 	counts.forEach(elem=> {
		
// 		document.querySelectorAll('like').onclick = function (){
// 			console.log(elem);
// 			elem.hidden = !elem.hidden;
// 		}
// 		elem.addEventListener('click', function(){
			
			
// 		})
		
// 	});

outMessagNode.addEventListener('click', function(){
	if (event.target.className != 'like') return;
	
	// let count = event.target.closest('.count');

	// let count = event.target.closest('.count')
	
	// count.classList.toggle("none")

	
	// // const like = document.querySelectorAll('like');
	// const count = document.createElement("div");
	// count.dataset.counter = true
	// count.textContent= 1;
	// count.value = count.textContent 
	
	// console.log(count.value)
	// if ((event.target.dataset.counter = true) != undefined) { // если есть атрибут...
   //    // i++
		
	// 	console.log(count);
		
   //  }

	// coment.appendChild(count)
	// 	if (count){
	// 		// count.innerHTML = ""
	// 	}
			
	
	
});

clearBtnNode.addEventListener('click', function(){

	// comments.length = 0;			
	commntFielOutNode.innerHTML = '';
	// localStorage.removeItem('comments');

});






// let panes = document.getElementsByClassName("pane");
// for (let pane of panes) {
//     let xButton = document.createElement("button"); // создаём кнопку
//     xButton.className = "remove-button";
//     xButton.innerHTML = "[x]";
    
//     pane.style.position = "relative";               // позиционируем кнопку
//     xButton.style.position = "absolute";            // относительно сообщения
//     xButton.style.top = "0";
    
//     xButton.onclick = () => pane.remove();          // функционал кнопки
    
//     pane.append(xButton);                           // вставляем кнопку в сообщение
// }

// node.removeChild(node.lastChild) //! удалить по одному элементу
// node.querySelectorAll('*').forEach((n) => n.remove()); //! еще один вариант удалить все

