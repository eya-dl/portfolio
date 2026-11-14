// Hero: type the assistant's answer once, then reveal its sources.
(function () {
  const el = document.querySelector(".typed");
  if (!el) return;
  const extras = document.querySelectorAll(".sources, .checks");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const text = el.dataset.text;
  extras.forEach((n) => n.classList.add("reveal"));
  el.textContent = "";
  el.classList.add("is-typing");
  let i = 0;
  setTimeout(function tick() {
    i += 2;
    el.textContent = text.slice(0, i);
    if (i < text.length) {
      setTimeout(tick, 22);
    } else {
      el.classList.remove("is-typing");
      extras.forEach((n, k) => setTimeout(() => n.classList.add("on"), 250 + k * 300));
    }
  }, 700);
})();

// Project filters.
(function () {
  const chips = document.querySelectorAll(".chip");
  const items = document.querySelectorAll(".projects [data-tags]");
  const moreTitle = document.querySelector(".more-title");
  const empty = document.querySelector(".projects .empty");

  chips.forEach((chip) =>
    chip.addEventListener("click", () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      let shown = 0, shownCards = 0;
      items.forEach((it) => {
        const ok = f === "all" || it.dataset.tags.split(" ").includes(f);
        it.hidden = !ok;
        if (ok) { shown++; if (it.classList.contains("card")) shownCards++; }
      });
      moreTitle.hidden = shownCards === 0;
      empty.hidden = shown !== 0;
    })
  );
})();
