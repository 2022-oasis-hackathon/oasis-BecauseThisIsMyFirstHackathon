
// 수정인 경우 미리 채우기
if(window.location.href !='http://localhost:3000/journal/add') {

  Id = Number(window.location.search.slice(4));
  console.log(Id);

  fetch(`http://localhost:3000/api/journal/record/each?id=${Id}`)   
    .then((response) => response.text())
    .then((result) => { 
    Datas = JSON.parse(result);
    // console.log(result);
    console.log(Datas);

    // 값 채우기
    document.querySelector("#date").value = Datas.result.journalDate;
    document.querySelector("#time").value = Datas.result.journalHours;

    let content = Datas.result.journalEtc;
    content = content.replace("<p>","");
    content = content.replace("</p>","");
    content = content.replaceAll("<br />","\n");
    document.querySelector("#inputbox").value = content;
      
  });

}






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


  if(window.location.href==='http://localhost:3000/journal/add'){       // 일지 추가
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
  else {     // 수정
      journalId = Number(window.location.search.slice(4));
      console.log(typeof(journalId));

      journalEditForm = {journalId,journalDate,journalHours,journalEtc};

      fetch('http://localhost:3000/api/journal/record/update', {
        headers: {
          'Content-Type': 'application/json'     
        },
        method: 'POST',
        body: JSON.stringify(journalEditForm),     //객체 -> JSON
      }) 
        .then((response) => response.text())
        .then((result) => { 
          // console.log(result);
          Datas = JSON.parse(result);
          // console.log(Datas);
          
          if(Datas.code===200 ){
            location.href = 'http://localhost:3000/journal/list';
          }
        });

      
  }


  
}

completeBTN.addEventListener("click", clickCompleteBTN);

