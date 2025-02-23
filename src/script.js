function scrollToEventWeek() {

	const eventSection = document.querySelector(".event-week");

	eventSection.scrollIntoView({
		behavior: "smooth", 
		block: "start", 
	});
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Strona załadowana i gotowa do działania.");
});

