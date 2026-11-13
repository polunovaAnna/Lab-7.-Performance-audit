import { useLayoutEffect } from "react";

function isInViewport(rect) {
	return rect.bottom > 0 && rect.top < window.innerHeight;
}

export function useBioClamp(containerRef, deps) {
	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return undefined;

		const update = () => {
			const visible = [];
			container.querySelectorAll(".tutor-card__bio").forEach((bio) => {
				if (isInViewport(bio.getBoundingClientRect())) {
					visible.push({
						bio,
						card: bio.closest(".tutor-card"),
						fullHeight: 0,
						clampedHeight: 0,
					});
				}
			});

			if (visible.length === 0) return;
			visible.forEach(({ bio }) => {
				bio.classList.remove("is-clamped");
			});

			visible.forEach((item) => {
				item.fullHeight = item.bio.offsetHeight;
			});

			visible.forEach(({ bio }) => {
				bio.classList.add("is-clamped");
			});

			visible.forEach((item) => {
				item.clampedHeight = item.bio.offsetHeight;
			});

			visible.forEach(({ card, fullHeight, clampedHeight }) => {
				if (card) {
					card.classList.toggle("has-more", fullHeight > clampedHeight + 1);
				}
			});
		};

		let rafId = null;
		const onScrollOrResize = () => {
			if (rafId !== null) return;
			rafId = requestAnimationFrame(() => {
				rafId = null;
				update();
			});
		};

		update();
		window.addEventListener("scroll", onScrollOrResize, { passive: true });
		window.addEventListener("resize", onScrollOrResize);

		return () => {
			window.removeEventListener("scroll", onScrollOrResize);
			window.removeEventListener("resize", onScrollOrResize);
			if (rafId !== null) {
				cancelAnimationFrame(rafId);
			}
		};
	}, deps);
}
