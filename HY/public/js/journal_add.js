

// 완료 버튼
let journalForm;
const completeBTN = document.querySelector(".complete");

function clickCompleteBTN() {
  const journalDate = document.querySelector("#date").value;
  const journalHours = document.querySelector("#time").value;


  const txtBox = document.getElementById("inputbox");
  let lines = txtBox.value.split("\n");
  let journalEtc    = "<p>";
  for (let i = 0; i < lines.length; i++) {
    journalEtc   += lines[i] + "<br />";
  }
  journalEtc   += "</p>";

  journalForm = {journalDate,journalHours,journalEtc};
  console.log(journalForm);

  fetch('http://localhost:3000/api/journal/record', {
    headers: {
      'Content-Type': 'application/json'     
    },
    method: 'POST',
    body: JSON.stringify(journalForm),     //객체 -> JSON
  }) 
    .then((response) => response.text())
    .then((result) => { 
      // console.log(result);
      Datas = JSON.parse(result);
      console.log(Datas);
      
      if(Datas.code===200 ){
        location.href = 'http://localhost:3000/journal/list';
      }
     });





}

completeBTN.addEventListener("click", clickCompleteBTN);

