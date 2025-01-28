export const PRODUCTS = [
  { name: "Drag And Drop", link: "#" },
  { name: "Visual Studio X", link: "#" },
  { name: "Easy Content", link: "#" },
];

export const RESOURCES = [
  { name: "Industries and tools", link: "#" },
  { name: "Use cases", link: "#" },
  { name: "Blog", link: "#" },
  { name: "Online event", link: "#" },
  { name: "Nostrud exercitation", link: "#" },
];

export const COMPANY = [
  { name: "Diversity & inclusion", link: "/" },
  { name: "About us", link: "about" },
  { name: "Press", link: "/" },
  { name: "Customer Stories", link: "contact" },
  {
    name: "Admin",
    link: "/admin",
    onClick: (e) => {
      e.preventDefault(); // Prevent default navigation behavior
      const password = prompt("Enter password:");
      if (password === "123") {
        window.location.href = "/admin"; // Navigate to admin page
      } else {
        alert("Incorrect password!");
      }
    },
  },
];

export const SUPPORT = [
  { name: "Documentation", link: "#" },
  { name: "Tutorials & guides", link: "#" },
  { name: "Webinars", link: "#" },
  { name: "Open-source", link: "#" },
];
