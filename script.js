const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");

fruitForm.addEventListener("submit", extractFruit);

function extractFruit(e) {
  e.preventDefault();
  fetchFruit(e.target.fruitInput.value);
  e.target.fruitInput.value = "";
}

let cal = 0;

function addFruit(fruit) {
  const li = document.createElement("li");
  li.textContent = fruit.name;
  const imgurl =
    "https://pixabay.com/api/key=54810753-c970ae0e97a375af20d3dff02&q=${fruit}";
  const img = document.createElement("img");
  img.src = imgurl;
  li.appendChild(img);
  li.addEventListener("click", removeFruit);
  fruitList.appendChild(li);
  cal += fruit.nutritions.calories;
  fruitNutrition.textContent = cal;
}

async function fetchFruit(fruit) {
  try {
    const resp = await fetch(
      `https://fruit-api-5v0j.onrender.com/fruits/${fruit}`,
    );
    if (resp.ok) {
      const data = await resp.json();
      addFruit(data);
      addImage(data);
    } else {
      throw `Error: http status code = ${resp.status}`;
    }
  } catch (err) {
    console.log(err);
  }
}
/*
function addImage(fruit) {
  const img = document.createElement("img");
  img.src = fruit.image;
}

async function fetchImage(fruit) {
  try {
    const resp = await fetch(
      `https://pixabay.com/api/key=54810753-c970ae0e97a375af20d3dff02&q=${fruit}`,
    );
    if (resp.ok) {
      const data = await resp.json();
      addImage(data);
    } else {
      throw `Error: http status code = ${resp.status}`;
    }
  } catch (err) {
    console.log(err);
  }
}
  */

function removeFruit(e) {
  cal -= e.target.nutritions.calories;
  fruitNutrition.textContent = cal;
  e.target.remove();
}
