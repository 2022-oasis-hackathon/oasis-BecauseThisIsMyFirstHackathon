

fetch(`http://localhost:3000/api/review/record`)   
.then((response) => response.text())
.then((result) => { 
Datas = JSON.parse(result);
// console.log(result);
// console.log(Datas);

showList(Datas);

  
});


// 화면에 시각화 함수
function showList(exDatas) {
console.log(exDatas);

const count = exDatas.result.length;

const myTable = document.querySelector('.myTable');

for(let i=0;i<count;i++){

  const newTR = document.createElement('tr');

  const td1 = document.createElement('td');
  td1.innerHTML = i+1;
  td1.classList.add('num');

  const td2 = document.createElement('td');
  td2.innerHTML = exDatas.result[i].reviewTitle;
  td2.classList.add('table-title');

  const td3 = document.createElement('td');
  td3.innerHTML = exDatas.result[i].reviewAuthor;
  td3.classList.add('author');

  const td4 = document.createElement('td');
  td4.innerHTML = exDatas.result[i].reviewCount;
  if(exDatas.result[i].reviewCount===null){
    td4.innerHTML=0;
  }
  td4.classList.add('count');

  newTR.appendChild(td1);
  newTR.appendChild(td2);
  newTR.appendChild(td3);
  newTR.appendChild(td4);

  myTable.appendChild(newTR);

}

}





