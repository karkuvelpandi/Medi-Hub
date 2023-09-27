// Main script file

// Listener for executing functions once after the page fully loaded
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    console.log("Document fully loaded");
  }
});

// Tab switching script
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".card-wrapper");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    contents.forEach((c) => (c.style.display = "none"));
    contents[index].style.display = "block";
  });
});
