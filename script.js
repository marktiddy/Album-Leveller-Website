// ---------------------------------------------------------------------------
// STORE: the only lines to edit when the Gumroad product is ready.
//   url   - your Gumroad product link, e.g. "https://marktiddy.gumroad.com/l/albumleveler"
//   price - shown on the page; keep it the same as the price set on Gumroad
// While url is empty, the page shows "Coming soon" and the button stays disabled.
// ---------------------------------------------------------------------------
const STORE = {
  url: "https://marktiddy.gumroad.com/l/albumleveler",
  price: "£7",
};

// Buy button: once a Gumroad link is set, show the price and link the button to the
// Gumroad checkout page.
(() => {
  if (!/^https:\/\/([^/]+\.)?gumroad\.com\//.test(STORE.url)) return;
  document.querySelectorAll("[data-store-price]").forEach((el) => { el.textContent = STORE.price; });
  document.querySelectorAll("[data-store-buy]").forEach((el) => {
    el.href = STORE.url;
    el.textContent = "Buy Album Leveler – " + STORE.price;
    el.classList.remove("is-disabled");
    el.removeAttribute("aria-disabled");
  });
})();

// Screenshot tabs (WAI-ARIA tabs pattern). Without JavaScript the first panel still shows.
document.querySelectorAll("[data-shots]").forEach((root) => {
  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));

  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab, false));
    tab.addEventListener("keydown", (e) => {
      const keys = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      select(tabs[(keys[e.key] + tabs.length) % tabs.length], true);
    });
  });
});
