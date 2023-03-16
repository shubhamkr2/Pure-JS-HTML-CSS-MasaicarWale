//wishlist icon link for both transparent and red
let favourites_default_icon =
  "https://icon-library.com/images/wishlist-icon/wishlist-icon-19.jpg";
let favourites_red_icon =
  "https://uxwing.com/wp-content/themes/uxwing/download/relationship-love/red-heart-icon.png";

let modal = document.querySelector(".modal");
let cars_container = document.querySelector(".cars_container");
cars_container.innerHTML = "<h1>Loading....</h1>";
let price_sortas = "";
let kms_sortas = "";
let filter_brand = "";
let price_update_id = ""; //global variable for storing id with edit btn of particular car for updating price

//function to create a card
function appendData(data) {
  cars_container.innerHTML = "";
  data.map(async(item, i) => {
    let car_div = document.createElement("div");
    let image = document.createElement("img");
    let icon = document.createElement("img");
    icon.classList.add("icon");

    let check = await isWishlisted(item.id);
    
    if (check === false) {
      icon.src = favourites_default_icon;
    } else {
      icon.src = favourites_red_icon;
    }

    //adding functionality to favourites icon
    icon.addEventListener("click", () => {
      if (icon.src === favourites_default_icon) {
        icon.src = favourites_red_icon;
        postData(
          "https://mock-json-server-ax9s.onrender.com/wishlisted_cars",
          item
        );
      } else {
        deleteData(
          `https://mock-json-server-ax9s.onrender.com/wishlisted_cars/${item.id}`
        );
        icon.src = favourites_default_icon;
      }
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

    //remove button
    let remove_btn = document.createElement("button");
    remove_btn.classList.add("remove");
    remove_btn.innerText = "Remove";
    remove_btn.addEventListener("click", async () => {
      await deleteData(
        `https://mock-json-server-ax9s.onrender.com/cars/${item.id}`
      );
      alert("Deleted Successfully");
      fetchData();
    });

    //edit button
    let edit_btn = document.createElement("button");
    edit_btn.classList.add("edit");
    edit_btn.innerText = "Edit";
    edit_btn.addEventListener("click", () => {
      price_update_id = item.id;
      modal.classList.add("modal_open");
      cars_container.classList.add("modal_open_blurr");
    });

    let details_div = document.createElement("div");
    details_div.classList.add("details");
    details_div.append(
      year_name,
      icon,
      type,
      span_div,
      price_div,
      p,
      edit_btn,
      remove_btn
    );

    car_div.append(image, details_div);
    cars_container.append(car_div);
  });
}

//updating price
let update_price = document.querySelector(".update_price");
update_price.addEventListener("click", async () => {
  await updatePrice(
    price_update_id,
    document.querySelector("#new_price").value
  );
});

//closing modal
function onCloseModal() {
  modal.classList.remove("modal_open");
  cars_container.classList.remove("modal_open_blurr");
  price_update_id = "";
}
//for sorting
function sortingByPrice() {
  let price = document.querySelector("#price");
  if (price.value === "LH") {
    price_sortas = "asc";
  } else if (price.value === "HL") {
    price_sortas = "desc";
  } else {
    price_sortas = "";
  }
  fetchData();
}

function sortingByKms() {
  let kms = document.querySelector("#kms");
  if (kms.value === "10000") {
    kms_sortas = "kms_lte=10000";
  } else if (kms.value === "20000") {
    kms_sortas = "kms_lte=20000";
  } else if (kms.value === "50000") {
    kms_sortas = "kms_lte=50000";
  } else if (kms.value === "100000") {
    kms_sortas = "kms_lte=100000";
  } else {
    kms_sortas = "";
  }
  fetchData();
}

//for filtering
function filterByBrand() {
  let brand = document.querySelector("#filter");
  console.log(brand.value);
  if (brand.value === "Maruti") {
    filter_brand = "brand=Maruti";
  } else if (brand.value === "Hyundai") {
    filter_brand = "brand=Hyundai";
  } else if (brand.value === "Mahindra") {
    filter_brand = "brand=Mahindra";
  } else if (brand.value === "Tata") {
    filter_brand = "brand=Tata";
  } else {
    filter_brand = "";
  }
  fetchData();
}

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

//function to do a delete request
async function deleteData(url) {
  try {
    let res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
}

//function to update the price
async function updatePrice(Id, price) {
  console.log(Id);
  await fetch(`https://mock-json-server-ax9s.onrender.com/cars/${Id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ price: +price }),
  });
  fetchData();
  onCloseModal();
}

fetchData();
async function fetchData() {
  try {
    let response = await fetch(
      `https://mock-json-server-ax9s.onrender.com/cars?_sort=price&_order=${price_sortas}&kms_gte=1&${kms_sortas}&${filter_brand}`
    );
    let data = await response.json();
    console.log(data);
    appendData(data);
  } catch (err) {
    console.log(err);
  }
}

async function isWishlisted(Id) {
  try {
    let res = await fetch(
      `https://mock-json-server-ax9s.onrender.com/wishlisted_cars/${Id}`
    );
    let data = await res.json();
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(false);
  }
}
