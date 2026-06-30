export type WorkItem = {
  title: string;
  meta: readonly string[];
  image: string;
  alt: string;
};

export const workItems: WorkItem[] = [
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