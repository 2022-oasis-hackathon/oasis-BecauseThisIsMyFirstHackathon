

// 전화번호 받았다고 가정
const memberNumber = '01046230052';

const editPW = document.querySelector(".editPW");

function goEdit() {
  location.href = `http://localhost:3000/findPW?id=${memberNumber}`; 

}

editPW.addEventListener("click", goEdit);


// 값 미리 넣기

fetch(`http://localhost:3000/api/member/infoGet`)   
  .then((response) => response.text())
  .then((result) => { 
  Datas = JSON.parse(result);
  // console.log(result);
  console.log(Datas);

  document.querySelector("#name").value = Datas.result.memberName;
  document.querySelector("#pNumber").value = `${Datas.result.memberNumber}`;
});


// 탈퇴 버튼

const BTN = document.querySelector(".delete");
function click() {
  fetch(`http://localhost:3000/api/member/witdrawal`)   
  .then((response) => response.text())
  .then((result) => { 
  Datas = JSON.parse(result);
  // console.log(result);
  console.log(Datas);
  
  location.href = '/';
  });
}

BTN.addEventListener("click",click);



