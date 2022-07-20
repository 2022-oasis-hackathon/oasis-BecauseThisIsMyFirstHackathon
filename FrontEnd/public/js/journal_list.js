
// 화면 목록에 표시하기
function showList(exDatas) {
  console.log(exDatas);
  console.log(exDatas.result.length);

  const count = exDatas.result.length;

  const myTable = document.querySelector(".myTable");

  for(let i=0;i<count;i++){
    const newTR = document.createElement('tr');
    const newTD1 = document.createElement('td');
    newTD1.innerHTML =i+1;
    newTD1.classList.add("num");


    const newTD2 = document.createElement('td');
    newTD2.innerHTML = exDatas.result[i].journalDate.replaceAll('-','.');
    newTD2.classList.add("date");
    newTD2.id = exDatas.result[i].id; 
    newTD2.addEventListener("click",event => showEach(exDatas, newTD2.id));  // 클릭

    newTR.appendChild(newTD1);
    newTR.appendChild(newTD2);
    myTable.appendChild(newTR);

  }

}


// 아이디 인자로 받아서 세부사항 띄우는 함수
function showEach(ExDatas, ID){
  // console.log(ID);
  ID = Number(ID);

  let temp;
  for(let i=0;i<ExDatas.result.length;i++){
    if(ID===ExDatas.result[i].id){
      temp = ExDatas.result[i];
      break;
    }
  }
  // console.log(temp);

  document.querySelector("#jDate").innerHTML = temp.journalDate.replaceAll('-','.');
  document.querySelector("#jTime").innerHTML = `${temp.journalHours}시간`;

  let content = temp.journalEtc;
  content = content.replace("<p>",'');
  content = content.replace("</p>",'');
  content = content.replaceAll("<br />",'\n');

  document.querySelector("#jEtc").innerText = content;


  // 수정, 삭제 버튼 추가

  const tool = document.querySelector('.tool');
  
  while (tool.hasChildNodes()) {	
    tool.removeChild(tool.firstChild);   // 초기화
  }

  const delIMG = document.createElement('img');
  delIMG.src='/imgs/delete.PNG';
  delIMG.id = temp.id; 
  delIMG.classList.add("delete");
  delIMG.addEventListener("click", event=>deleteEach(delIMG.id));

  const editIMG = document.createElement('img');
  editIMG.src='/imgs/edit.PNG';
  editIMG.id = temp.id; 
  editIMG.classList.add("edit");
  editIMG.addEventListener("click", event=>editEach(delIMG.id));

  tool.appendChild(editIMG);
  tool.appendChild(delIMG);
}



// 아이디 받아서 삭제 함수
function deleteEach(ID){
  console.log("삭제",ID);
  const journalId = ID;
  const deleteForm = {journalId};

  fetch('http://localhost:3000/api/journal/record/delete', {
    headers: {
      'Content-Type': 'application/json'     
    },
    method: 'POST',
    body: JSON.stringify(deleteForm),     //객체 -> JSON
  }) 
    .then((response) => response.text())
    .then((result) => { 
      // console.log(result);
      Datas = JSON.parse(result);
      // console.log("삭제", Datas);

      if(Datas.code===200){
        location.href='http://localhost:3000/journal/list';
      }
     });
}

// 아이디 받아서 수정 함수
function editEach(ID) {
  console.log("수정",ID);
  location.href = `http://localhost:3000/journal/add?id=${ID}`; 
}



// 화면에 표 시각화 
function show() {
  fetch(`http://localhost:3000/api/journal/record`)   
  .then((response) => response.text())
  .then((result) => { 
  Datas = JSON.parse(result);
  // console.log(result);
  console.log(Datas);

  showList(Datas);
  
});
}




show();

