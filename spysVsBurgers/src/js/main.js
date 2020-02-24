console.log(`Hello World from main.js! 
Change this message, and make sure it changes in the browser 
to verify optionB you're working in the right files.`)

let optionA = document.querySelector('.containerA')
let optionB = document.querySelector('.containerB')
let optionACount = document.querySelector('.optionACount')
let optionBCount = document.querySelector('.optionBCount')
let resetBttn = document.querySelector('.reset')
let voteBalance = document.querySelector('.prog')
let urlA = 'http://circuslabs.net:3000/data/optionA'
let urlB = 'http://circuslabs.net:3000/data/optionB'

let curentACount = 0
let curentBCount = 0



optionA.addEventListener('click', function() {
	axios.post(urlA, {
	  type: 'number',
	  action: '++'
	})
	.then(response => {
		updateVoteCount()
		console.log(response.data.data.value)
		console.log(response)
	})
	// optionA.classList.add('bounce')
	// setTimeout(function(){
	// 	optionA.classList.remove('bounce')
	// },2000)
})



optionB.addEventListener('click', function() {
	axios.post(urlB, {
	  type: 'number',
	  action: '++'
	})
	.then(response => {
		updateVoteCount()
	})
	// optionB.classList.add('bounce')
	// setTimeout(function(){
	// 	optionB.classList.remove('bounce')
	// },2000)
})



let updateVoteCount = function() {
	axios.get(urlA)
	.then(function (response) {
	  	curentACount = response.data.data.value
	  	optionACount.innerText = curentACount
	  	updateBars()
	})
	.catch(function (error) {
		console.warn('axios encountered an error!', error);
	}); 
	axios.get(urlB)
	.then(function (response) {
	  	curentBCount = response.data.data.value
	  	optionBCount.innerText = curentBCount
	  	updateBars()
	})
	.catch(function (error) {
		console.warn('axios encountered an error!', error);
	});
}

setInterval(updateVoteCount, 1000)


resetBttn.addEventListener('click', function(){
	axios.post(urlA, {
		type:'number',
		action:'=',
		value:0
	})
	.then(response => {
		updateVoteCount()
	})
		axios.post(urlB, {
		type:'number',
		action:'=',
		value:0
	})
	.then(response => {
		updateVoteCount()
	})
})

window.addEventListener('keyup', function(){
	if (event.code === "KeyR"){
		axios.post(urlA, {
		type:'number',
		action:'=',
		value:0
	})
	.then(response => {
		updateVoteCount()
	})
		axios.post(urlB, {
		type:'number',
		action:'=',
		value:0
	})
	.then(response => {
		updateVoteCount()
	})	
	}
})

let updateBars = function(){
	voteBalance.style.width = curentACount/ (curentBCount+curentACount) *100 +'%'
	if (curentACount === curentBCount){
		voteBalance.style.width = '50%'
	}
}
let optionAHover = document.querySelectorAll('[on-hoverA-switch-img-to]')

let goToPageA = function(id){
	let oldPage = document.querySelector('.active')
	oldPage.classList.remove('active')
	oldPage.classList.add('leaving')
	setTimeout(function(){
		oldPage.classList.remove('leaving')
	},500)

	let newPage = document.querySelector('#' + id)
	setTimeout(function(){
		newPage.classList.add('entering')
	},250)
	setTimeout(function(){
		newPage.classList.remove('entering')
		newPage.classList.add('active')
	},750)
	
}

optionAHover.forEach(function(button){
	button.addEventListener('click', function(){
		let id = this.getAttribute('on-hoverA-switch-img-to')
		goToPageA( id )
	})
})

let optionBHover = document.querySelectorAll('[on-hoverB-switch-img-to]')

let goToPageB = function(id){
	let oldPage = document.querySelector('.pageB.active')
	oldPage.classList.remove('active')
	oldPage.classList.add('leaving')
	setTimeout(function(){
		oldPage.classList.remove('leaving')
	},500)

	let newPage = document.querySelector('#' + id)
	setTimeout(function(){
		newPage.classList.add('entering')
	},250)
	setTimeout(function(){
		newPage.classList.remove('entering')
		newPage.classList.add('active')
	},750)
	
}

optionBHover.forEach(function(button){
	button.addEventListener('click', function(){
		let id = this.getAttribute('on-hoverB-switch-img-to')
		goToPageB( id )
	})
})










