const checks = document.getElementsByClassName("check-input");
const dateIn = document.querySelector(".date input");

const button = document.querySelector(".submit-button");
//const idArr = [];
const percentNum = document.querySelector(".number");
const progress = document.querySelector(".progress");
progress.style.width = "30%";
percentNum.innerText = `${progress.style.width}`;
/*
fetch(`http://localhost:3000/api/progresslist`)
  .then((response) => response.text())
  .then((result) => {
    Datas = JSON.parse(result);
    console.log(Datas);
  });*/

// 날짜 post 요청
function clickButton() {
  const arr = [];
  for (let check of checks) {
    check.checked = true;
    arr.push(check);
  }
  const checkDate = document.querySelector("#date-input").value;
  const date = { checkDate };
  if (checkDate !== "") {
    console.log(date);
    fetch("http://localhost:3000/api/progresslist", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(date), //객체 -> JSON
    })
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        Datas = JSON.parse(result);
        console.log(Datas);
      });
  } else {
    alert("완료한 날짜를 입력하세요");
  }
}

button.addEventListener("click", clickButton);

var now_utc = Date.now();
var timeOff = new Date().getTimezoneOffset() * 60000;
var today = new Date(now_utc - timeOff).toISOString().split("T")[0];
dateIn.setAttribute("max", today);

/*
for (let i in dateInput) {
  check[i].addEventListener("click", () => {
    if (dateInput[i].value !== "") {
      check[i].disabled = false;
      console.log(dateInput[i].value);
    } else {
      alert("완료한 날짜를 입력하세요");
      check[i].checked = false;
    }
  });
}

*/
