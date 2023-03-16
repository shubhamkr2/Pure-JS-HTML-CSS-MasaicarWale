let wishlist_container = document.querySelector(".wishlist_container");
let favourites_red_icon =
  "https://uxwing.com/wp-content/themes/uxwing/download/relationship-love/red-heart-icon.png";

function appendData(data) {
  wishlist_container.innerHTML = "";
  data.map((item, i) => {
    let car_div = document.createElement("div");
    let image = document.createElement("img");
    let icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src = favourites_red_icon;

    //adding functionality to favourites icon
    icon.addEventListener("click", async () => {
      await deleteData(
        `https://mock-json-server-ax9s.onrender.com/wishlisted_cars/${item.id}`
      );
      fetchData();
    });

    image.src =
      "http://majorspoilers.com/wp-content/uploads/2014/01/image007.jpg";

    let year_name = document.createElement("h2");
    year_name.innerText = `${item.year} ${item.brand}`;

    let type = document.createElement("h4");
    type.innerText = item.type;

    let kms = document.createElement("span");
    kms.innerText = `${item.kms} km`;

    let owner = document.createElement("span");
    owner.innerText = "1st Owner";

    let engine_type = document.createElement("span");
    engine_type.innerText = "Petrol";

    let span_div = document.createElement("div");
    span_div.classList.add("span");
    span_div.append(kms, owner, engine_type);

    let per_month = document.createElement("h3");
    per_month.innerText = "Rs 11,439/month";

    let price = document.createElement("h4");
    price.innerText = `Rs ${item.price}`;

    let price_div = document.createElement("div");
    price_div.classList.add("price");
    price_div.append(per_month, price);

    let p = document.createElement("p");
    p.innerText = "Zero Down Payment";

    let details_div = document.createElement("div");
    details_div.classList.add("details");
    details_div.append(year_name, icon, type, span_div, price_div, p);

    car_div.append(image, details_div);
    wishlist_container.append(car_div);
  });
}

//function to do a delete request
async function deleteData(url) {
  try {
    let res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Removed Successfully");
  } catch (err) {
    console.log(err);
  }
}

fetchData();
async function fetchData() {
  try {
    let response = await fetch(
      `https://mock-json-server-ax9s.onrender.com/wishlisted_cars`
    );
    let data = await response.json();
    console.log(data);
    appendData(data);
  } catch (err) {
    console.log(err);
  }
}
