const dateIn = document.querySelector(".date input");

const button = document.querySelector(".submit-button");
//const idArr = [];
const percentNum = document.querySelector(".number");
const progress = document.querySelector(".progress");


// 화면에 리스트 시각화
function showList(exDatas) {
  console.log(exDatas);

  const count = exDatas.result.length;
  console.log(count);

  const Table = document.querySelector("#test");

  for(let i=0;i<count;i++){
    let temp = exDatas.result[i];

    const newTR = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerHTML = temp.UPLName;
    td1.classList.add("name");

    const td2 = document.createElement("td");
    td2.innerHTML = temp.UPLExplain;   
    td2.classList.add("method");

    const td3 = document.createElement('td');
    const Input = document.createElement('input');
    Input.classList.add("check-point");
    Input.setAttribute("type","checkbox");
    Input.id = temp.id;
    td3.id = temp.id;
    td3.appendChild(Input);

    newTR.appendChild(td1);
    newTR.appendChild(td2);
    newTR.appendChild(td3);

    Table.appendChild(newTR);
    
  }

}

fetch("http://localhost:3000/api/progresslist")
  .then((response) => response.text())
  .then((result) => {
    Datas = JSON.parse(result);
    // console.log(Datas);

    // 퍼센티지 표시
    let percent = (Datas.currentHour / Datas.maxHour) * 100
    progress.style.width =`${percent}%`;
    percentNum.innerText = `${percent}%`;

    // 화면에 리스트 표시
    showList(Datas);

});

const list = document.getElementsByClassName("check-input");
let check = 0;
let arrList = Array.prototype.slice.call(list);



// 체크 상황 보내기
let checkList = [];

function whatCheck() {
  const checkBoxes = document.getElementsByClassName("check-point");

  for(let i=0;i<checkBoxes.length;i++){
    if(checkBoxes[i].checked === true){
      // console.log(checkBoxes[i].id);
      checkList.push(checkBoxes[i].id);
    }
    // console.log(checkBoxes[i].checked);
  }
  console.log(checkList);

  const checkDate = document.querySelector("#date-input").value;
  const checkForm = {checkDate,checkList};
  // console.log(checkForm);

  if (checkDate !== "") {
    // fetch 보내기

    fetch("http://localhost:3000/api/progresslist", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(checkForm), //객체 -> JSON
    })
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        Datas = JSON.parse(result);
        console.log(Datas);
      
        location.href = 'http://localhost:3000/journal/checklist';
      });







  }
  else{
    alert("완료한 날짜를 입력하세요");
  }
}

button.addEventListener("click", whatCheck);





var now_utc = Date.now();
var timeOff = new Date().getTimezoneOffset() * 60000;
var today = new Date(now_utc - timeOff).toISOString().split("T")[0];
dateIn.setAttribute("max", today);

