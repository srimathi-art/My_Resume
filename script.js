document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // PRINT / SAVE AS PDF
  // ==============================

  const printButton = document.getElementById("printResume");

  if (printButton) {
    printButton.addEventListener("click", () => {
      window.print();
    });
  }


  // ==============================
  // DARK / LIGHT MODE
  // ==============================

  const themeButton = document.getElementById("themeToggle");

  const savedTheme = localStorage.getItem("resumeTheme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }


  function updateThemeButton() {

    if (!themeButton) return;

    const isDark =
      document.body.classList.contains("dark-mode");

    themeButton.textContent =
      isDark ? "☀ Light Mode" : "☾ Dark Mode";
  }


  updateThemeButton();


  if (themeButton) {

    themeButton.addEventListener("click", () => {

      document.body.classList.toggle("dark-mode");

      const isDark =
        document.body.classList.contains("dark-mode");

      localStorage.setItem(
        "resumeTheme",
        isDark ? "dark" : "light"
      );

      updateThemeButton();

    });

  }


  // ==============================
  // COPY EMAIL
  // ==============================

  const emailButton =
    document.getElementById("copyEmail");

  const emailAddress =
    "srimathipalanisami1909@gmail.com";


  if (emailButton) {

    emailButton.addEventListener(
      "click",
      async () => {

        try {

          await navigator.clipboard.writeText(
            emailAddress
          );

          const originalText =
            emailButton.textContent;

          emailButton.textContent =
            "✓ Email Copied";


          setTimeout(() => {

            emailButton.textContent =
              originalText;

          }, 1800);


        } catch {

          window.location.href =
            `mailto:${emailAddress}`;

        }

      }
    );

  }


  // ==============================
  // PROJECT FILTERING
  // ==============================

  const filterButtons =
    document.querySelectorAll("[data-filter]");

  const projects =
    document.querySelectorAll(
      ".project[data-category]"
    );


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedCategory = button.dataset.filter;

    // Remove active state
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active state
    button.classList.add("active");

    // Filter projects
    projects.forEach((project) => {

      const categories = project.dataset.category
        .toLowerCase()
        .split(",");

      if (
        selectedCategory === "all" ||
        categories.includes(selectedCategory.toLowerCase())
      ) {

        project.style.display = "";

      } else {

        project.style.display = "none";

      }

    }); // projects.forEach

  }); // button.addEventListener

}); // filterButtons.forEach
});