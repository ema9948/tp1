(() => {
  const form = document.getElementById("form");
  const amount = document.getElementById("amount");
  const precie = document.getElementById("precie");
  const clear = document.getElementById("clear");

  form.addEventListener("submit", submit);

  clear.addEventListener("click", clean);

  function clean(value) {
    amount.classList.add("visually-hidden");
    form.reset();
  }

  function submit(value) {
    value.preventDefault();
    const formData = new FormData(form);

    if (checkInput(formData)) {
      return;
    }

    const data = serializeForm(formData);

    // const json = JSON.stringify(Object.fromEntries(formData));

    precie.textContent = descuento(data);
    amount.classList.remove("visually-hidden");
  }

  const descuento = (e) => {
    const offSale = [80, 50, 15];
    if (e.categoria < 0) {
      Swal.fire({
        title: "Error!",
        text: `Categoría Errónea!`,
        icon: "error",
        confirmButtonText: "Cool",
      });
      return;
    }

    return e.cantidad * (200 - 200 * (offSale[e.categoria] / 100));
  };

  const serializeForm = function (form) {
    let obj = {};
    for (var key of form.keys()) {
      obj[key] = form.get(key);
    }
    return obj;
  };

  const checkInput = (value) => {
    let status = false;
    for (var key of value.keys()) {
      if (!value.get(key)) {
        Swal.fire({
          title: "Error!",
          text: `Complete el campo " ${key.toUpperCase()} "`,
          icon: "error",
          confirmButtonText: "Exit",
        });
        status = true;
        break;
      }
    }
    return status;
  };
})();
