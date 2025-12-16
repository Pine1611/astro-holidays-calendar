import { useState } from "react";
import { NodeCollapse, NodeExpand } from "./Icons";

const ShowHideButton = () => {
	const [isHide, setIsHide] = useState(true);

	const sidebar = document.getElementById("sidebar");

	const handleShowHide = () => {
		if (!isHide) {
			sidebar.classList.remove("show");
		} else {
			sidebar.classList.add("show");
		}
		setIsHide(!isHide);
	};

	return (
		<>
			<button
				className="absolute top-3 right-0 translate-x-full cursor-pointer rounded-r-lg bg-slate-950 p-2 inset-ring inset-ring-white/10 md:hidden"
				onClick={handleShowHide}>
				{isHide ? (
					<NodeExpand className="fill-slate-50" />
				) : (
					<NodeCollapse className="fill-slate-50" />
				)}
			</button>
		</>
	);
};

export default ShowHideButton;
