// Creates card for to-do list
import { parse, formatDistanceToNow } from "date-fns"
import { L } from "qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel"

export const toDoFactory = (obj) => {
	obj.priority = obj.priority.toUpperCase()

	const description = (() => {
		let description = document.createElement("div")
		description.textContent = obj.description
		return description
	})()

	const dueDate = (() => {
		let dueDate = document.createElement("div")
		// Formats time between now and due date
		dueDate.textContent = formatDistanceToNow(
			parse(obj.dueDate, "yyyy-MM-dd", new Date()),
			{ addSuffix: true }
		)
		return dueDate
	})()

	const priority = (() => {
		// Colours for priority levels
		const priorityColour = {
			HIGH: "bg-orange-500",
			MEDIUM: "bg-yellow-500",
			LOW: "bg-green-500",
			URGENT: "bg-red-500",
		}

		let priority = document.createElement("div")
		priority.textContent = obj.priority.toUpperCase()
		priority.classList.add(
			priorityColour[priority.textContent],
			"px-2",
			"rounded-md",
			"text-center"
		)
		return priority
	})()

	const completeButton = (() => {
		// Create button element
		const button = document.createElement("button")
		button.classList.add(
			"w-6",
			"h-6",
			"rounded-full",
			"bg-white",
			"transition-all"
		)
		// Create button checkmark
		const span = document.createElement("span")
		span.classList.add(
			"material-icons",
			"hidden",
			"scale-125",
			"relative",
			"ml-0.5",
			"mb-0.5"
		)
		span.textContent = "check"

		// Event handler for button
		button.appendChild(span)
		button.onclick = () => {
			button.classList.toggle("bg-white")
			button.classList.toggle("bg-green-500")
			button.nextElementSibling.classList.toggle("line-through")
			span.classList.toggle("hidden")
		}

		return button
	})()
	const deleteButton = (() => {
		const button = document.createElement("button")
		button.classList.add("w-6", "h-6", "flex", "items-center")
		// Create trashcan icon
		const span = document.createElement("span")
		span.classList.add(
			"material-icons",
			"text-2xl",
			"text-center",
			"relative",
			"ml-0.5",
			"mb-0.5",
			"text-white",
			"hover:scale-125"
		)
		span.textContent = "delete"

		button.appendChild(span)

		const event = new CustomEvent("delete", {
			bubbles: true,
		})
		button.onclick = () => {
			button.dispatchEvent(event)
		}

		return button
	})()

	const card = document.createElement("div")
	card.classList.add(
		"grid",
		"grid-cols-[max-content_auto_max-content_6rem_max-content]",
		"gap-x-4",
		"m-4",
		"px-4",
		"py-2",
		"bg-sky-700",
		"hover:scale-[1.02]",
		"hover:shadow-xl",
		"rounded-xl",
		"ease-in",
		"transition-all",
		"duration-100",
		"animate__animated",
		"animate__fadeInUp"
	)
	card.appendChild(completeButton)
	card.appendChild(description)
	card.appendChild(dueDate)
	card.appendChild(priority)
	card.appendChild(deleteButton)

	return card
}
