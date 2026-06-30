import "./_runtime/external-mirror-shim.js";

const servicesLayoutStyle = document.createElement("style");
servicesLayoutStyle.textContent = `
#services .haw-sub-group > .haw-grid-row:nth-child(5) .haw-grid-item > .h-c,
#services .haw-sub-group > .haw-grid-row:nth-child(6) .haw-grid-item > .h-c {
  grid-area: span 1 / span 2 / span 1 / span 2;
}

#services .haw-sub-group > .haw-grid-row:nth-child(5) .haw-grid-item > .haw-item-sub-wrap,
#services .haw-sub-group > .haw-grid-row:nth-child(6) .haw-grid-item > .haw-item-sub-wrap {
  grid-area: span 1 / span 3 / span 1 / span 3;
  justify-self: end;
}
`;
document.head.appendChild(servicesLayoutStyle);


const homeWorkCardsStyle = document.createElement("style");
homeWorkCardsStyle.textContent = `
#works .hcs-item-w {
  position: relative;
}

#works .hcs-item-w[data-work-title]::after {
  content: attr(data-work-title);
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 6;
  transform: translate(-50%, -50%);
  width: min(82%, 18rem);
  color: #f4f4f4;
  font-size: clamp(1.35rem, 2.2vw, 2.7rem);
  line-height: 0.96;
  font-weight: 600;
  letter-spacing: 0;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0 0.15rem 1.2rem rgba(0, 0, 0, 0.65);
  pointer-events: none;
}

#works .hcs-item-w[data-work-title]::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0) 58%);
}
`;
document.head.appendChild(homeWorkCardsStyle);

const homeWorkCards = [
  {
    title: "Dashboard Kit",
    meta: ["UI Design", "Admin Dashboard", "Product Interface"],
    image: "/techtiks-works/dashboard-kit.jpg",
    alt: "Dashboard Kit portfolio preview",
  },
  {
    title: "Black Men Stuff",
    meta: ["Branding", "Ecommerce", "Digital Campaign"],
    image: "/techtiks-works/black-men-stuff.jpg",
    alt: "Black Men Stuff portfolio preview",
  },
  {
    title: "Hexa Magazine",
    meta: ["Editorial Design", "Creative Direction", "Digital Layout"],
    image: "/techtiks-works/hexa-magazine.jpg",
    alt: "Hexa Magazine portfolio preview",
  },
  {
    title: "Lookbook Pro",
    meta: ["Lookbook", "Product Showcase", "Visual System"],
    image: "/techtiks-works/lookbook-pro.jpg",
    alt: "Lookbook Pro portfolio preview",
  },
  {
    title: "Digital UI Kit",
    meta: ["UI Kit", "Components", "Interface Assets"],
    image: "/techtiks-works/digital-ui-kit.jpg",
    alt: "Digital UI Kit portfolio preview",
  },
  {
    title: "App Branding",
    meta: ["Brand Identity", "App Design", "Launch Assets"],
    image: "/techtiks-works/app-branding.jpg",
    alt: "App Branding portfolio preview",
  },
];

const worksSection = document.querySelector("#works");
if (worksSection) {
  const cards = worksSection.querySelectorAll<HTMLAnchorElement>(".hcs-item-w");
  cards.forEach((card, index) => {
    const data = homeWorkCards[index];
    if (!data) {
      card.style.display = "none";
      return;
    }

    card.dataset.workTitle = data.title;
    card.href = "#works";

    const title = card.querySelector<HTMLElement>(".hcs-info-w h3, .hcs-info-w .text-small");
    if (title) title.textContent = data.title;

    const metaItems = card.querySelectorAll<HTMLElement>(".hcs-title-w .text-mini");
    metaItems.forEach((item, metaIndex) => {
      item.textContent = data.meta[metaIndex] ?? "";
    });

    const image = card.querySelector<HTMLImageElement>(".hcs-img-inner");
    if (image) {
      image.src = data.image;
      image.alt = data.alt;
      image.removeAttribute("srcset");
      image.removeAttribute("sizes");
    }
  });
}

const worksGalleryStyle = document.createElement("style");
worksGalleryStyle.textContent = `
#works-gallery .hg-grid-item[data-work-title] {
  position: relative;
  overflow: hidden;
}

#works-gallery .hg-grid-item[data-work-title]::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 38%, rgba(0, 0, 0, 0.68) 100%);
}

#works-gallery .hg-grid-item[data-work-title]::after {
  content: attr(data-work-title);
  position: absolute;
  left: clamp(0.75rem, 1.4vw, 1.25rem);
  right: clamp(0.75rem, 1.4vw, 1.25rem);
  bottom: clamp(0.75rem, 1.4vw, 1.25rem);
  z-index: 3;
  color: #f4f4f4;
  font-size: clamp(0.72rem, 0.95vw, 1rem);
  line-height: 1.05;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: uppercase;
  text-wrap: balance;
  pointer-events: none;
}

#works-gallery .hg-grid-item.is-text .text-small {
  max-width: 11ch;
}
`;
document.head.appendChild(worksGalleryStyle);

const worksGalleryTitles = [
  "Dashboard Kit",
  "Black Men Stuff",
  "Hexa Magazine",
  "Lookbook Pro",
  "Digital UI Kit",
  "App Branding",
];

const worksGallery = document.querySelector("#works-gallery");
if (worksGallery) {
  const pictureTiles = worksGallery.querySelectorAll<HTMLElement>(".hg-grid-item:not(.is-text)");
  pictureTiles.forEach((tile, index) => {
    const data = homeWorkCards[index % homeWorkCards.length];
    tile.dataset.workTitle = worksGalleryTitles[index % worksGalleryTitles.length];

    const image = tile.querySelector<HTMLImageElement>("img");
    if (image) {
      image.src = data.image;
      image.alt = data.alt;
      image.removeAttribute("srcset");
      image.removeAttribute("sizes");
    }
  });

  const textTiles = worksGallery.querySelectorAll<HTMLElement>(".hg-grid-item.is-text .text-small");
  textTiles.forEach((tile, index) => {
    tile.innerHTML = worksGalleryTitles[index % worksGalleryTitles.length].replace(/ /g, "<br>");
  });
}
const contactButtonMatchStyle = document.createElement("style");
contactButtonMatchStyle.textContent = `
#contact .btn-w[data-contact-match] {
  transition: border-color 0.28s ease, background-color 0.28s ease, transform 0.28s ease;
}

#contact .btn-w[data-contact-match] .btn-bg-w {
  display: block;
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: opacity 0.28s ease, transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
}

#contact .btn-w[data-contact-match]:hover .btn-bg-w,
#contact .btn-w[data-contact-match]:focus-visible .btn-bg-w {
  opacity: 1;
  transform: scaleX(1);
}

#contact .btn-w[data-contact-match]:hover .btn-icon-w .btn-txt,
#contact .btn-w[data-contact-match]:focus-visible .btn-icon-w .btn-txt {
  transform: translate(1em, 0);
}

#contact .btn-w[data-contact-match]:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 4px;
}
`;
document.head.appendChild(contactButtonMatchStyle);

const footerContactButtons = document.querySelectorAll<HTMLAnchorElement>("#contact .btn-w.is-large");
footerContactButtons.forEach((button) => {
  button.setAttribute("data-contact-match", "");
});
export {};
