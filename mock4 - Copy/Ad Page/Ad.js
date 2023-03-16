let brand = document.querySelector("#brand");
let type = document.querySelector("#type");
let year = document.querySelector("#year");
let driven = document.querySelector("#driven");
let description = document.querySelector("#description");
let price = document.querySelector("#price");
let form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let url = "https://mock-json-server-ax9s.onrender.com/cars";
  let data = {
    brand: brand.value,
    type: type.value,
    year: +year.value,
    kms: +driven.value,
    description: description.value,
    price: +price.value,
  };

  console.log(data);
  postData(url, data);
  alert("Ad Listed Successfully");
  form.reset();
});

//function to do post request
async function postData(url, data) {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
