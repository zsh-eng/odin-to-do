import "./style.css"
import "./components.js"
import { toDoFactory } from "./components.js"

const toDoList = [
	{
		project: "Main",
		description: "Finish CS50",
		dueDate: "2022-05-25",
		priority: "high",
	},
	{
		project: "Main",
		description: "Get booster shot",
		dueDate: "2022-04-26",
		priority: "urgent",
	},
	{
		project: "Chores",
		description: "Buy milk, eggs and fish from NTUC",
		dueDate: "2022-04-24",
		priority: "medium",
	},
	{
		project: "Chores",
		description: "Sweep the floor",
		dueDate: "2022-04-25",
		priority: "low",
	},
]
const projectsList = ["All", "Main", "Chores"]

const taskDisplayController = (() => {
	const container = document.querySelector(".container")
	const select = document.querySelector("#project-display")

	const filter = (text) => {
		let firstChild = container.firstElementChild
		container.innerHTML = ""
		container.appendChild(firstChild)

		const toDoListFiltered =
			text === "All" ? toDoList : toDoList.filter((e) => e.project === text)
		toDoListFiltered.forEach((e) => {
			container.appendChild(toDoFactory(e))
		})
	}
	const projectController = (() => {
		const formSelect = document.getElementById("project")
		projectsList.forEach((e) => {
			let option = document.createElement("option")
			option.value = e
			option.textContent = e
			select.appendChild(option)
			// Clone option into modal form
			formSelect.appendChild(option.cloneNode(true))
		})
		// Filter projects based on choice
		select.addEventListener("change", (evt) => {
			display()
		})
	})()
	// Displays the currently selected project
	const display = () => {
		filter(select.value)
	}

	const newProjectHandler = (() => {
		const newButton = document.getElementById("new-project")
	})()

	// Listen for delete event
	const deleteHandler = (() => {
		window.addEventListener("delete", (evt) => {
			const parent = evt.target.parentElement
			const description = parent.children[1].textContent
			const deleteIndex = toDoList.findIndex(
				(obj) => obj.description == description
			)
			toDoList.splice(deleteIndex, 1)
			display()
		})
	})()
	return { filter, display }
})()
taskDisplayController.filter("All")
// Handles the appearance of modal when creating new tasks
const modalDisplayController = (() => {
	const modal = document.querySelector(".modal")
	const button = document.getElementById("new-task")

	// Shows the notification
	const showNotification = () => {
		const notification = document.getElementById("notification")
		const notificationAppear = () => {
			notification.classList.add("animate__slideInDown")
			notification.classList.remove("hidden")
		}
		const notificationDisappear = () => {
			notification.classList.remove("animate__slideInDown")
			notification.classList.add("animate__fadeOut")
			setTimeout(() => {
				notification.classList.add("hidden")
			}, 1500)
		}

		notificationAppear()
		setTimeout(notificationDisappear, 3000)
	}

	// Shows the New Task form when button is clicked
	const showModal = () => {
		modal.classList.remove("hidden")
	}

	// Hides the new task form when user clicks anywhere outside form
	const hideModal = () => {
		modal.classList.add("hidden")
	}

	button.onclick = showModal

	// Hides modal if you click outside the screen
	window.onclick = (event) => {
		const modalContent = document.querySelector(".modal-content")
		if (event.target === modalContent) {
			hideModal()
		}
	}

	return { hideModal, showNotification }
})()

const formHandler = (() => {
	const submitForm = (() => {
		const submitButton = document.getElementById("submit-button")
		submitButton.onclick = () => {
			const form = document.getElementById("new-task")
			const formElement = new FormData(form)
			let formData = {}

			formElement.forEach((value, key) => {
				formData[key] = value
			})
			Object.assign(formData, { dueDate: formData["due-date"] })
			toDoList.push(formData)
			taskDisplayController.display()

			modalDisplayController.hideModal()
			// Resets form data
			form.reset()
		}
	})()
})()
