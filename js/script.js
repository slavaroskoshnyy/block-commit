const clearBtnNode = document.querySelector('#comment-clear');
const clearFirstCommentBtnNode = document.querySelector('#comment-clear-one');
const wrapperBtnNode = document.querySelector('.js-form-btn');
const commntFielOutNode = document.querySelector('#commen-field');
const fieldsNode = document.querySelectorAll('.form-kontrol')
const commentNameNode = document.querySelector('#comment-name');
const commentBodyNode = document.querySelector('#comment-body');
const commentDataNode = document.querySelector('#сomment-date');
const outMessagNode = document.querySelector('#commen-field');

let comments = [];
loadComments();
valideitionFocus(commentNameNode);
valideitionFocus(commentBodyNode);

commentBodyNode.addEventListener('input', ()=>{
	localStorage.setItem('texst', commentBodyNode.value)
})

document.querySelector('#clear-form').onclick = ()=>{
	localStorage.removeItem('texst');
}

commentBodyNode.value = localStorage.getItem('texst');

function valideitionFocus(node){
	node.onblur = function() {
	if (!this.value) {
		this.classList.add('error');
		this.nextElementSibling.innerHTML = 'Введите текст.'
	};
 };

 node.oninput = function() {
	if (this.classList.contains('error')) {
		this.nextElementSibling.innerHTML = ''
	  	this.classList.remove('error');
	};
 };
};

function valideition(){
	let emptiImputs = Array.from(fieldsNode).filter(input=>input.value === '');

	fieldsNode.forEach(function(input){
		if (input.value === ''){
			input.classList.add('error');
			input.nextElementSibling.innerHTML = 'Заполните поле!'	
		} else {
			input.nextElementSibling.innerHTML = ''
			input.classList.remove('error');
		};
	});

	if (emptiImputs.length !== 0){
		return click;	
	};
};

if (commntFielOutNode.children.length != 0){
	wrapperBtnNode.classList.remove('none')
} ;

function saveComments() {
	localStorage.setItem('comments', JSON.stringify(comments));
	
};

function loadComments() {
	if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
	showComments();
	
};

function showComments() {
	let out = '';

	comments.forEach(function(item){
		out += ` <div class="out-put">
						<p class="text-out">${timeConverter(item.time)}</p>	
						<p class="text-out">${item.name}</p>
						<p class="text-out">${item.body}</p>
						<div class="count-like">
							<p class="count none">1</p>
							<button class="like"></button>
						</div>
						<button class="remove-button"></button>			
					</div>`;
	});
	commntFielOutNode.innerHTML = out;
};

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

	if (diffDay < 1 && Math.sign(diffDay) != -1){
		return `Сегодня, ${hour}:${min}`
	}
	if (diffDay < 2 && Math.sign(diffDay) != -1){
		return `Вчера, ${hour}:${min}`
	}
	return time;
};

document.getElementById('comment-add').onclick = function click(){
	event.preventDefault();

	let dataValue = commentDataNode.valueAsNumber/1000 + 
			(new Date().getUTCHours()*60*60) + 
			(new Date().getMinutes()*60) + 
			(new Date().getSeconds());
	
	valideition();
	
	const commet = {
		name: commentNameNode.value,
		body: commentBodyNode.value,
		time: dataValue || Math.floor(Date.now()/1000),
	};
	
	commentBodyNode.value = '';
	commentNameNode.value = '';
	commentDataNode.value = '';
	localStorage.removeItem('texst');

	comments.push(commet);
	saveComments();
	showComments();

	if (commntFielOutNode.children.length != 0){
		wrapperBtnNode.classList.remove('none');
	};
};

outMessagNode.addEventListener("click", ({ target }) => {
	const likeBtn = target.closest(".like");
	
	if (!likeBtn) return;

	const count = target.closest(".count-like");
	count.firstElementChild.classList.toggle('none');
});


outMessagNode.addEventListener('click', function(){
	if (event.target.className != 'remove-button') return;
	
	let coment = event.target.closest('.out-put');
	coment.remove();

	if (commntFielOutNode.children.length === 0){
	wrapperBtnNode.classList.add('none');
	} ;
});

clearBtnNode.addEventListener('click', function(){

	comments.length = 0;		
	commntFielOutNode.innerHTML = '';
	localStorage.removeItem('comments');
	wrapperBtnNode.classList.add('none');
});

clearFirstCommentBtnNode.addEventListener('click', function(){

	commntFielOutNode.removeChild(commntFielOutNode.lastElementChild);
	comments.splice(comments.length-1);
	saveComments();

	if (commntFielOutNode.children.length === 0){
		wrapperBtnNode.classList.add('none');
	};
});