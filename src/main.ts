import "./_runtime/external-mirror-shim.js";
import { setupWorkPage } from "./work-page";
import { workItems } from "./work-items";

const currentPage = document.querySelector<HTMLElement>("[data-page]")?.dataset.page ?? "";
const isHomePage = currentPage === "home";

setupWorkPage(currentPage);

const syncOurWorkHeaderLink = () => {
  const headerLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(".hud-nav-flex > div a.page-link-w"),
  );
  const link =
    headerLinks.find((item) => /sell with us|webflow enterprise|w\. enterprise/i.test(item.textContent ?? "")) ??
    headerLinks[1];

  if (!link) return;
  link.href = "/our-work/";

  const label = link.querySelector<HTMLElement>(
    ".page-link-inner > .btn-txt, .page-link-inner > .text-small, .page-link-inner > .text-mini",
  );
  if (label) label.textContent = "Our Work";
};
if (isHomePage) {
  syncOurWorkHeaderLink();

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

  const homeWorkLinks = document.querySelectorAll<HTMLAnchorElement>(
    'a[href="#works"], a[href="#works-gallery"]',
  );
  homeWorkLinks.forEach((link) => {
    link.href = "/our-work/";
  });

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


  const worksSection = document.querySelector("#works");
  if (worksSection) {
    const cards = worksSection.querySelectorAll<HTMLAnchorElement>(".hcs-item-w");
    cards.forEach((card, index) => {
      const data = workItems[index];
      if (!data) {
        card.style.display = "none";
        return;
      }

      card.dataset.workTitle = data.title;
      card.href = "/our-work/";

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


  const worksGallery = document.querySelector("#works-gallery");
  if (worksGallery) {
    const pictureTiles = worksGallery.querySelectorAll<HTMLElement>(".hg-grid-item:not(.is-text)");
    pictureTiles.forEach((tile, index) => {
      const data = workItems[index % workItems.length];
      tile.dataset.workTitle = data.title;

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
      tile.innerHTML = workItems[index % workItems.length].title.replace(/ /g, "<br>");
    });
  }
  document.documentElement.dataset.homeWorkReady = "true";
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
const footerLayoutFixStyle = document.createElement("style");
footerLayoutFixStyle.textContent = `
.s.is-footer .ft-nav-w {
  display: grid !important;
  grid-template-columns: minmax(7rem, 0.75fr) minmax(20rem, 1.35fr) minmax(12rem, 0.9fr) !important;
  column-gap: clamp(2rem, 5vw, 6rem) !important;
  align-items: start;
}

.s.is-footer .ft-nav-w > .ft-nav-col {
  grid-area: auto !important;
  min-width: 0;
}

.s.is-footer .ft-nav-w > .ft-nav-col:nth-child(4) {
  display: none !important;
}

.s.is-footer .ft-nav-w .page-link-w,
.s.is-footer .ft-nav-w .page-link-inner,
.s.is-footer .ft-nav-w .ft-nav-link-w,
.s.is-footer .ft-nav-w .btn-txt {
  max-width: 100%;
}

.s.is-footer .ft-nav-w > .ft-nav-col:nth-child(2) {
  min-width: min(100%, 20rem);
}

.s.is-footer .ft-nav-w > .ft-nav-col:nth-child(2) .page-link-inner,
.s.is-footer .ft-nav-w > .ft-nav-col:nth-child(2) .btn-txt,
.s.is-footer .ft-nav-w > .ft-nav-col:nth-child(3) .btn-txt {
  white-space: normal !important;
  overflow-wrap: anywhere;
}

.s.is-footer .ft-nav-w > .ft-nav-col:nth-child(3) .text-small {
  max-width: 14rem;
  line-height: 1.05;
}

@media (max-width: 900px) {
  .s.is-footer .ft-nav-w {
    grid-template-columns: minmax(7rem, 0.75fr) minmax(18rem, 1.35fr) minmax(10rem, 0.9fr) !important;
    column-gap: clamp(1.25rem, 4vw, 2.5rem) !important;
  }

  .s.is-footer .ft-nav-w .text-small {
    font-size: clamp(0.82rem, 2.35vw, 1rem);
  }
}

@media (max-width: 720px) {
  .s.is-footer .ft-nav-w {
    grid-template-columns: 1fr !important;
    row-gap: 2rem;
  }

  .s.is-footer .ft-nav-w > .ft-nav-col {
    width: 100%;
  }
}
`;
document.head.appendChild(footerLayoutFixStyle);


const footerAddressLink = {
  label: "111 J Phase 2, Johar Town, Lahore",
  href: "https://www.google.com/maps/search/?api=1&query=111%20J%20Phase%202%20Johar%20Town%20Lahore",
};

const renderFooterAddressLink = () => `
<div link-reveal="" class="o-hidden" data-footer-address="true"><div class="o-hidden"><a reveal-target="" stagger-el="" href="${footerAddressLink.href}" target="_blank" rel="noopener noreferrer" class="page-link-w w-inline-block"><div class="o-hidden page-link-inner"><div split-text="" stagger-text="" class="text-small btn-txt">${footerAddressLink.label}</div><div class="btn-icon-r"><div class="btn-icon-w"><div class="text-small btn-txt">-&gt;</div></div></div></div><div class="link-track"><div class="link-track-fill"></div></div></a></div></div>`;

const appendFooterAddressLinks = () => {
  document
    .querySelectorAll<HTMLElement>(".s.is-footer .ft-nav-w > .ft-nav-col:nth-child(2) .ft-nav-link-w")
    .forEach((column) => {
      if (column.querySelector("[data-footer-address]")) return;
      column.insertAdjacentHTML("beforeend", renderFooterAddressLink());
    });
};

appendFooterAddressLinks();
const footerContactButtons = document.querySelectorAll<HTMLAnchorElement>("#contact .btn-w.is-large");
footerContactButtons.forEach((button) => {
  button.setAttribute("data-contact-match", "");
});
const footerAiIconGroups = document.querySelectorAll<HTMLElement>(
  ".ft-nav-col.is-ai .ft-nav-link-w.is--ai",
);
footerAiIconGroups.forEach((group) => {
  group.remove();
});
export {};
