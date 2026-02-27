const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");

let cal = 0;
const fruitCal = {};
const apiKey = "54810753-c970ae0e97a375af20d3dff02";

fruitForm.addEventListener("submit", extractFruit);

function extractFruit(e) {
  e.preventDefault();
  fetchFruitData(e.target.fruitInput.value);
  e.target.fruitInput.value = "";
}

async function fetchFruitData(fruit) {
  try {
    const respData = await fetch(
      `https://fruit-api-5v0j.onrender.com/fruits/${fruit}`,
    );
    const respImg = await fetch(
      `https://pixabay.com/api/?q=${fruit}+fruit&key=${apiKey}`,
    );
    if (respData.ok && respImg.ok) {
      const data = await respData.json();
      const imgData = await respImg.json();
      addFruit(data, imgData);
    } else {
      throw "something went wrong with one of the API requests";
    }
  } catch (err) {
    console.log(err);
  }
}

function addFruit(fruit, fruitImg) {
  const img = document.createElement("img");
  img.classList.add("fruits");
  img.alt = fruit.name;
  img.src = fruitImg.hits[0].webformatURL;

  img.addEventListener("click", removeFruit, { once: true });
  fruitList.appendChild(img);
  fruitCal[fruit.name] = fruit.nutritions.calories;
  cal += fruit.nutritions.calories;
  fruitNutrition.textContent = "Total Calories: " + cal;
}

function removeFruit(e) {
  const fruitName = e.target.alt;
  cal -= fruitCal[fruitName];
  fruitNutrition.textContent = "Total Calories: " + cal;
  e.target.remove();
}
