
// 화면 목록에 표시하기
function showList(exDatas) {
  console.log(exDatas);
  console.log(exDatas.result.length);

  const count = exDatas.result.length;

  const myTable = document.querySelector(".myTable");

  for(let i=0;i<count;i++){
    const newTR = document.createElement('tr');
    const newTD1 = document.createElement('td');
    newTD1.innerHTML = exDatas.result[i].id;
    newTD1.classList.add("num");


    const newTD2 = document.createElement('td');
    newTD2.innerHTML = exDatas.result[i].journalDate.replaceAll('-','.');
    newTD2.classList.add("date");
    newTD2.id = exDatas.result[i].id; 
    newTD2.addEventListener("click",event => showEach(exDatas, newTD2.id));       

    newTR.appendChild(newTD1);
    newTR.appendChild(newTD2);
    myTable.appendChild(newTR);

  }

}


// 아이디 인자로 받아서 세부사항 띄우는 함수
function showEach(ExDatas, ID){
  console.log(ID);
  ID = Number(ID);
  let temp;
  for(let i=0;i<ExDatas.result.length;i++){
    if(ID===ExDatas.result[i].id){
      temp = ExDatas.result[i];
      break;
    }
  }
  console.log(temp);

  document.querySelector("#jDate").innerHTML = temp.journalDate.replaceAll('-','.');
  document.querySelector("#jTime").innerHTML = `${temp.journalHours}시간`;

  let content = temp.journalEtc;
  content = content.replace("<p>",'');
  content = content.replace("</p>",'');
  content = content.replaceAll("<br />",'\n');

  document.querySelector("#jEtc").innerText = content;



}


fetch(`http://localhost:3000/api/journal/record`)       // 쿼리스트링으로 요청 보내기
.then((response) => response.text())
.then((result) => { 
  Datas = JSON.parse(result);
  // console.log(result);
  // console.log(Datas);

  showList(Datas);
  

});



