import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

createApp(App).mount('#app')

document.addEventListener('DOMContentLoaded', (e) => {
	const current = new Date()
	const localeCode = 'nl-NL'

	document.getElementById('toggleNav').onclick = function() {
		const aside = document.getElementById('aside')
		if (aside.classList.contains('hidden')) {
			aside.classList.remove('hidden')
		} else {
			aside.classList.add('hidden')
		}
	}

	/*document.getElementById('toggleNav').onclick = function () {
	// Get the DOM reference
	var asideId = document.getElementById("aside");
	// Toggle
	if(asideId.style.display == "none"){
	  asideId.style.display = "block";
	}
	else{
	  asideId.style.display = "none";
	}
  }*/

	function currentDate(ret = 0) {
		const dateObj = current
		const dateString = current.toLocaleString()
		const monthNameShort = current.toLocaleString(localeCode, {
			month: 'short',
		})
		const dayNameLong = current.toLocaleString(localeCode, { weekday: 'long' })

		const a = document.querySelector('#workout-vandaag')
		a.href = '#workout-' + currentDateNum(1, 0, 0)

		var date = new Date()
		var optionsDate = { weekday: 'long', month: 'long', day: 'numeric' }
		const dateOutput = date.toLocaleDateString([localeCode], optionsDate)

		document.getElementById('datum').innerHTML = dateOutput
		if (ret === 1) {
			console.log('dateOutput: ' + dateOutput)
		}
	}

	function currentDateNum(ret = 1, log = 0, inner = 0) {
		const yearNum = current.toLocaleString(localeCode, { year: 'numeric' })
		const monthNum = current
			.toLocaleString(localeCode, { month: 'numeric' })
			.padStart(2, '0')
		const dayNum = current
			.toLocaleString(localeCode, { day: 'numeric' })
			.padStart(2, '0')

		var date = new Date()
		const dateOutput = yearNum + monthNum + dayNum

		if (log === 1) {
			console.log('dateOutput: ' + dateOutput)
		}
		if (document.getElementById('workout-' + dateOutput) !== null) {
			var ele = document.getElementById('workout-' + dateOutput)
			ele.classList.add('vandaag')
		}

		if (ret === 1) {
			return dateOutput
		}
	}
	currentDateNum(1, 1, 1)

	function workoutArchive() {
		var breakit

		document.querySelectorAll('.workout-dag').forEach(function(i) {
			if (breakit === undefined) {
				i.classList.add('archive')
				if (i.classList.contains('vandaag')) {
					i.classList.remove('archive')
					breakit = 1
				}
			}
		})
	}
	workoutArchive()

	function scrollToHash(hashName) {
		setTimeout(function() {
			location.hash = '#' + hashName
			console.log('scrolled')
		}, 0)
	}

	// function archiefTonenToggle(){
	document.getElementById('archiefTonenToggle').onclick = function() {
		var toon = 0
		var verberg = 0
		document.querySelectorAll('.archive').forEach(function(i) {
			if (i.classList.contains('show')) {
				i.classList.remove('show')
				verberg = 1
				toon = 0
			} else {
				i.classList.add('show')
				verberg = 0
				toon = 1
			}
		})
		if (verberg === 1) {
			console.log('verbergen')
		}
		if (toon === 1) {
			console.log('tonen')
			scrollToHash('workout-' + (currentDateNum() - 1))
		}
	}
	// }

	function currentTime() {
		let current = new Date().toLocaleTimeString(localeCode, {
			hour: '2-digit',
			minute: '2-digit',

			second: '2-digit',
			timeZone: 'America/Argentina/Buenos_Aires',
		})

		document.getElementById('klok').innerText = current
		let time = setTimeout(function() {
			currentTime(current)
		}, 1000)

		/*-- */
		let klein = current.replace(':', '')
		let wat = klein.substring(0, 4)
	}
	currentDate()
	currentTime(current)

	function currentTimeHighlight() {
		let current = new Date().toLocaleTimeString(localeCode, {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'America/Argentina/Buenos_Aires',
		})

		document.getElementById('klok').innerText = current
		let time = setTimeout(function() {
			currentTimeHighlight(current)
		}, 60000)
	}
	currentTimeHighlight(current)
})
