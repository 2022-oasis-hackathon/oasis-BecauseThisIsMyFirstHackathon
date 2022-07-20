

// 전화번호 받았다고 가정
const memberNumber = '01046230052';

const editPW = document.querySelector(".editPW");

function goEdit() {
  location.href = `http://localhost:3000/findPW?id=${memberNumber}`; 

}

editPW.addEventListener("click", goEdit);