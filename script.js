fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const themeBtn = document.querySelector(".theme-logo");
    const allBtn = document.querySelector(".filter-all");
    const activeBtn = document.querySelector(".filter-active");
    const inactiveBtn = document.querySelector(".filter-inactive");
    const extensions = document.querySelector(".extensions");
    let theme = "d";
    function generate_extCards(list, theme) {
      for (let i = 0; i < list.length; i++) {
        let activeNess;
        if (list[i].isActive == true) {
          activeNess = "active";
        }
        const card = document.createElement("div");
        card.classList.add("extension");
        card.classList.add(theme);
        card.innerHTML = `   <div class="logo-name">
          <img src=${list[i].logo} alt="${list[i].name}" />
          <div class="discription">
            <h3>${list[i].name}</h3>
            <p>
              ${list[i].description}
            </p>
          </div>
        </div>
        <div class="btns">
          <button class="remove-btn  ${theme} " data-index= "${list[i].index}">Remove</button>
          <button class="activator-btn ${activeNess}  ${theme} " data-index= "${list[i].index}"><span></span></button>
        </div>`;
        extensions.appendChild(card);
      }
    }

    function activator() {
      const activatorBtn = document.querySelectorAll(".activator-btn");
      activatorBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          const ExtIndex = btn.dataset.index;
          btn.classList.toggle("active");
          if (data[ExtIndex].isActive == true) {
            data[ExtIndex].isActive = false;
          } else {
            data[ExtIndex].isActive = true;
          }
        });
      });
    }

    function remover() {
      const removerBtn = document.querySelectorAll(".remove-btn");
      removerBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          const ExtIndex = btn.dataset.index;
          btn.classList.toggle("active");
          if (data[ExtIndex].exist == true) {
            data[ExtIndex].exist = false;
          } else {
            data[ExtIndex].exist = true;
          }
        });
      });
    }
    generate_extCards(data, theme);
    activator();
    remover();
    themeBtn.addEventListener("click", () => {
      const header = document.querySelector(".header");
      const body = document.querySelector(".body");
      const extension = document.querySelectorAll(".extension");
      const removeBtns = document.querySelectorAll(".remove-btn");
      const activatorBtns = document.querySelectorAll(".activator-btn");
      const filterer = document.querySelectorAll(".filterer");
      body.classList.toggle("light");
      header.classList.toggle("light");
      themeBtn.classList.toggle("light");
      extension.forEach((el) => {
        el.classList.toggle("light");
      });
      removeBtns.forEach((el) => {
        el.classList.toggle("light");
      });
      activatorBtns.forEach((el) => {
        el.classList.toggle("light");
      });
      filterer.forEach((el) => {
        if (!el.classList.contains("active")) {
          el.classList.toggle("light");
        }
      });

      if (theme == "d") {
        theme = "light";
      } else {
        theme = "d";
      }
    });

    allBtn.addEventListener("click", () => {
      const allExtensions = data.filter((extension) => extension.exist == true);
      extensions.innerHTML = "";
      generate_extCards(allExtensions, theme);
      activator();
      remover();
      allBtn.classList.add("active");
      activeBtn.classList.remove("active");
      inactiveBtn.classList.remove("active");
    });
    activeBtn.addEventListener("click", () => {
      const activeExtensions = data
        .filter((extension) => extension.exist == true)
        .filter((extension) => extension.isActive == true);
      extensions.innerHTML = "";
      generate_extCards(activeExtensions, theme);
      activator();
      remover();
      allBtn.classList.remove("active");
      activeBtn.classList.add("active");
      inactiveBtn.classList.remove("active");
    });
    inactiveBtn.addEventListener("click", () => {
      const inActiveExtensions = data
        .filter((extension) => extension.exist == true)
        .filter((extension) => extension.isActive == false);
      extensions.innerHTML = "";
      generate_extCards(inActiveExtensions, theme);
      activator();
      remover();
      allBtn.classList.remove("active");
      activeBtn.classList.remove("active");
      inactiveBtn.classList.add("active");
    });
  })
  .catch((error) => {
    console.log(error);
  });
