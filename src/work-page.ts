import { workItems } from "./work-items";

type SiteLink = {
  label: string;
  href: string;
};

const ROUTES = {
  home: "/",
  about: "/#about",
  works: "/our-work/",
  services: "/#services",
  contact: "/#contact",
  email: "mailto:contact@techtiksgroup.com",
  phoneUs: "tel:+16083526097",
  phonePk: "tel:+923164778292",
  inert: "#",
} as const;

const sitemapLinks: SiteLink[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About Us", href: ROUTES.about },
  { label: "Works", href: ROUTES.works },
  { label: "Services", href: ROUTES.services },
  { label: "Contact", href: ROUTES.contact },
];

const contactLinks: SiteLink[] = [
  { label: "contact@techtiksgroup.com", href: ROUTES.email },
  { label: "1 608 352 6097", href: ROUTES.phoneUs },
  { label: "+92 316 477 8292", href: ROUTES.phonePk },
  { label: "Mon - Fri (9 to 5)", href: ROUTES.contact },
];

const desktopNavLinks: SiteLink[] = [
  { label: "Services", href: ROUTES.services },
  { label: "Our Work", href: ROUTES.works },
];

const menuLinkMap: Record<string, SiteLink> = {
  home: { label: "Home", href: ROUTES.home },
  "about us": { label: "About Us", href: ROUTES.about },
  work: { label: "Works", href: ROUTES.works },
  works: { label: "Works", href: ROUTES.works },
  services: { label: "Services", href: ROUTES.services },
  contact: { label: "Contact", href: ROUTES.contact },
  "w. enterprise": { label: "Our Work", href: ROUTES.works },
  "webflow enterprise": { label: "Our Work", href: ROUTES.works },
  manifesto: { label: "About Us", href: ROUTES.about },
};

export const setupWorkPage = (page: string) => {
  if (page !== "work") return;

  sanitizeImportedLinks();
  setupWorkPageStyles();
  setupWorkHeader();
  setupWorkMenu();
  setupWorkProjects();
  setupWorkFooter();
  setupWorkPageRouting();
};

const sanitizeImportedLinks = () => {
  document.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    setAnchorHref(link, ROUTES.inert);
  });
};

const setupWorkPageStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
[data-page="work"] .ft-nav-w {
  align-items: start;
}

[data-page="work"] .ft-nav-w .page-link-inner,
[data-page="work"] .ft-nav-w .btn-txt {
  white-space: nowrap;
}

[data-page="work"] .ft-nav-w .ft-nav-col:nth-child(2) {
  min-width: min(100%, 23rem);
}

[data-page="work"] .ft-nav-w .ft-nav-col:nth-child(3) .ft-nav-link-w {
  gap: 0.7rem;
}

[data-page="work"] .ft-nav-w .ft-nav-col:nth-child(3) .text-small {
  max-width: 14rem;
  line-height: 1.05;
}

[data-page="work"] .ft-nav-w .ft-nav-col:nth-child(4) {
  display: none !important;
}

[data-page="work"] .ow-grid .hcs-img-w img.hcs-img-inner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
`;
  document.head.appendChild(style);
};

const setupWorkProjects = () => {
  const cards = document.querySelectorAll<HTMLAnchorElement>(".ow-grid .hcs-item-w");
  cards.forEach((card, index) => {
    const data = workItems[index];
    if (!data) {
      card.style.display = "none";
      return;
    }

    card.style.removeProperty("display");
    card.dataset.workTitle = data.title;
    setAnchorHref(card, ROUTES.works);

    const title = card.querySelector<HTMLElement>(".hcs-info-w h3, .hcs-info-w .text-small");
    if (title) title.textContent = data.title;

    const metaItems = card.querySelectorAll<HTMLElement>(".hcs-title-w .text-mini");
    metaItems.forEach((item, metaIndex) => {
      item.textContent = data.meta[metaIndex] ?? "";
    });

    const imageWrap = card.querySelector<HTMLElement>(".hcs-img-w");
    if (!imageWrap) return;

    imageWrap.className = "hcs-img-w is-component";
    let image = imageWrap.querySelector<HTMLImageElement>("img.hcs-img-inner");
    if (!image) {
      imageWrap.innerHTML = "";
      image = document.createElement("img");
      image.className = "hcs-img-inner";
      image.loading = "lazy";
      imageWrap.appendChild(image);
    }

    image.src = data.image;
    image.alt = data.alt;
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
  });

  document.documentElement.dataset.workReady = 'true';
};
const setupWorkHeader = () => {
  setText(document, ".text-brand", "TECHTIKS GLOBAL");

  const brandLink = document.querySelector<HTMLAnchorElement>(".hud-brand-link");
  if (brandLink) setAnchorHref(brandLink, ROUTES.home);

  const headerLinks = document.querySelectorAll<HTMLAnchorElement>(".hud-nav-flex > div a.page-link-w");
  headerLinks.forEach((link, index) => {
    const item = desktopNavLinks[index];
    if (!item) return;

    setLinkLabel(link, item.label);
    setAnchorHref(link, item.href);
  });

  const contactButton = document.querySelector<HTMLAnchorElement>(".hud-nav-flex > .btn-w");
  if (contactButton) {
    setLinkLabel(contactButton, "Contact");
    setAnchorHref(contactButton, ROUTES.contact);
  }
};

const setupWorkMenu = () => {
  document.querySelectorAll<HTMLAnchorElement>(".hud-menu-link").forEach((link) => {
    const label = getLinkLabel(link).toLowerCase();
    const mappedLink = menuLinkMap[label];

    if (!mappedLink) {
      setAnchorHref(link, ROUTES.inert);
      return;
    }

    setLinkLabel(link, mappedLink.label);
    setAnchorHref(link, mappedLink.href);
  });
};

const setupWorkFooter = () => {
  const footer = document.querySelector<HTMLElement>(".s.is-footer");
  if (!footer) return;

  footer.querySelectorAll<HTMLElement>(".ft-cta-grid .h-a.is-sub").forEach((line, index) => {
    const copy = ["Ready to", "Get in touch", "with Techtiks", "Today"];
    line.textContent = copy[index] ?? line.textContent;
  });

  footer.querySelectorAll<HTMLAnchorElement>(".btn-w.is-large").forEach((button) => {
    setLinkLabel(button, "Contact Us");
    setAnchorHref(button, ROUTES.contact);
  });

  const footerColumns = footer.querySelectorAll<HTMLElement>(".ft-nav-w > .ft-nav-col");
  renderFooterLinkColumn(footerColumns[0], "Sitemap", sitemapLinks);
  renderFooterLinkColumn(footerColumns[1], "Contact", contactLinks);
  renderOfficeColumn(footerColumns[2]);

  if (footerColumns[3]) footerColumns[3].style.display = "none";

  setText(footer, ".ft-btm.is--footer .ft-nav-col.is-ai .text-small.caps", "Contact TechTiks directly.");
};

const setupWorkPageRouting = () => {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? ROUTES.inert;
      if (href === ROUTES.inert || link.dataset.inertLink === "true") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return;
      }

      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        event.stopPropagation();
        return;
      }

      if (href.startsWith("/") || href.startsWith("#")) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        window.location.assign(href);
      }
    },
    true,
  );
};

const renderFooterLinkColumn = (column: HTMLElement | undefined, title: string, links: SiteLink[]) => {
  if (!column) return;

  column.innerHTML = `
<p split-text="" stagger-scroll="1" class="text-small caps op-60">${title}</p>
<div class="ft-nav-link-w">
${links.map(renderFooterLink).join("")}
</div>`;
};

const renderOfficeColumn = (column: HTMLElement | undefined) => {
  if (!column) return;

  column.innerHTML = `
<p split-text="" stagger-scroll="1" class="text-small caps op-60">Office</p>
<div class="ft-nav-link-w">
<p split-text="" stagger-scroll="1" class="text-small btn-txt">111 J Phase 2,<br>Johar Town</p>
<p split-text="" stagger-scroll="1" class="text-small btn-txt">Lahore</p>
<p split-text="" stagger-scroll="1" class="text-small btn-txt">Mon - Fri (9<br>to 5)</p>
</div>`;
};

const renderFooterLink = ({ label, href }: SiteLink) => `
<div link-reveal="" class="o-hidden"><div class="o-hidden"><a reveal-target="" stagger-el="" href="${href}" class="page-link-w w-inline-block"><div class="o-hidden page-link-inner"><div split-text="" stagger-text="" class="text-small btn-txt">${label}</div><div class="btn-icon-w"><div class="text-small btn-txt">-&gt;</div></div></div><div class="link-track"><div class="link-track-fill"></div></div></a></div></div>`;

const setAnchorHref = (link: HTMLAnchorElement, href: string) => {
  link.setAttribute("href", href);
  link.removeAttribute("target");
  link.removeAttribute("rel");

  if (href === ROUTES.inert) {
    link.dataset.inertLink = "true";
  } else {
    delete link.dataset.inertLink;
  }
};

const setLinkLabel = (link: HTMLAnchorElement, label: string) => {
  const labelElement = link.querySelector<HTMLElement>(
    ".page-link-inner > .btn-txt, .page-link-inner > .text-mini, .btn-inner > .o-hidden .btn-txt",
  );
  if (labelElement) labelElement.textContent = label;
};

const getLinkLabel = (link: HTMLAnchorElement) => {
  const labelElement = link.querySelector<HTMLElement>(
    ".page-link-inner > .btn-txt, .page-link-inner > .text-mini, .btn-inner > .o-hidden .btn-txt",
  );
  return (labelElement?.textContent ?? "").trim().replace(/\s+/g, " ");
};

const setText = (scope: ParentNode, selector: string, text: string) => {
  const element = scope.querySelector(selector);
  if (element instanceof HTMLElement) element.textContent = text;
};
