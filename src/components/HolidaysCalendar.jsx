import { useEffect, useRef, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

const RenderCalendar = ({ holidays }) => {
	const calendarRef = useRef(null);

	const renderDayCellContent = (arg) => {
		if (arg.view.type != "dayGridMonth") return;

		const dateStr = arg.date.toLocaleDateString("en-CA");
		const holidayName = holidays[dateStr];

		const isHoliday = Boolean(holidayName);

		// console.log(arg);

		let elDayEvent = arg.el.querySelector(".fc-daygrid-day-bottom");
		elDayEvent.innerHTML = `${isHoliday ? `<span className="holiday-label">${holidayName}</span>` : ""}`;

		return { html: elDayEvent };
	};

	useEffect(() => {
		let calendar = new Calendar(calendarRef.current, {
			plugins: [dayGridPlugin],
			headerToolbar: {
				left: "prev,next today",
				center: "title",
				right: "",
			},

			views: {
				dayGridMonth: { buttonText: "View by Month" },
			},

			initialView: "dayGridMonth",
			navLinks: true,
			dayMaxEvents: true,
			eventDisplay: "block",

			// events: holidays,

			dayCellDidMount: renderDayCellContent,
		});
		calendar.render();
	});

	return <div ref={calendarRef}></div>;
};

export default function HolidaysCalendar() {
	const [holidays, setHolidays] = useState({});

	const fetchHolidays = async () => {
		try {
			const response = await fetch("/api/holidays.json");

			if (!response.ok) {
				throw new Error("Network response was not ok!");
			}

			const data = await response.json();

			setHolidays(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchHolidays();
	}, []);

	return (
		<>
			<div className="h-screen w-full p-4">
				<RenderCalendar holidays={holidays}></RenderCalendar>
			</div>
		</>
	);
}
