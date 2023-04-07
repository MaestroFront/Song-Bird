const users = document.querySelectorAll(".results__item");
const userNames = document.querySelectorAll(".result__item_name");
const userResults = document.querySelectorAll(".result__item_score");
const buttons = document.querySelectorAll(".btn");
const language = localStorage.getItem("language");

let results = JSON.parse(localStorage.getItem("results"));

if (results) {
  results.sort((a, b) => b.result - a.result);
  userResults.forEach((result, index) => {
    if (index < results.length) {
      result.textContent = results[index].result;
    }
  });

  userNames.forEach((name, index) => {
    if (index < results.length) {
      name.textContent = results[index].name;
    }
  });
}

if (language === "rus") {
  buttons[0].innerHTML = "Главная страница";
  buttons[1].innerHTML = "Викторина";
} else if (language === "eng") {
  buttons[0].innerHTML = "Main";
  buttons[1].innerHTML = "Quiz";
}
