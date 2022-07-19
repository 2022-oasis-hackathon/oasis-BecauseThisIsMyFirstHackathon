
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

    newTR.appendChild(newTD1);
    newTR.appendChild(newTD2);
    myTable.appendChild(newTR);

  }

}




fetch(`http://localhost:3000/api/journal/record`)       // 쿼리스트링으로 요청 보내기
.then((response) => response.text())
.then((result) => { 
  Datas = JSON.parse(result);
  // console.log(result);
  // console.log(Datas);
  // console.log(Datas.result.length);

  showList(Datas);
  

});