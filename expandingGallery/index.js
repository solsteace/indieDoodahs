function main() {
	let active = null;
	let gallery = document.getElementById("main-gallery")
	Object.values(gallery.children).forEach((child) => {
		child.addEventListener("click", () => {
			if(active === child) {
				active.classList.add("gallery__item");
				active.classList.remove("gallery__item--active");
				active = null
			} else {
				if(active !== null) {
					active.classList.add("gallery__item");
					active.classList.remove("gallery__item--active");
				}
				active = child;
				child.classList.remove("gallery__item");
				child.classList.add("gallery__item--active");
			}
		})
	})
}

main()
