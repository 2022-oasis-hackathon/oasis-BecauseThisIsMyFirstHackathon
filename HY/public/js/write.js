

const South = ['전남A','전남B','전남C'];
const North = ['전북A','전북B','전북C'];
// 전라남도 전라북도 선택

changePlace(South);
function categoryChange(value) {
  console.log(value);

  if(value==="전라남도"){
    clearPlace();
    changePlace(South);
  }
  else{
    clearPlace();
    changePlace(North);
    
  }

}

// 전남, 전북 선택에 따라 수리소 선택값 변경
function changePlace(arr){
  const place = document.querySelector('.place');
  
  for(let i=0;i<arr.length;i++){
    const newOption = document.createElement('option');
    newOption.innerHTML = arr[i];
    place.appendChild(newOption);
  }
}

// 수리소 선택 초기화
function clearPlace(){
  const place = document.querySelector('.place');
  
  while (place.hasChildNodes()) {	
    place.removeChild(place.firstChild);
  }
}



// 완료 버튼 눌렀을 때
let reviewForm;
const completeBTN = document.querySelector(".complete");

function clickCompleteBTN() {
  const reviewTitle = document.querySelector("#title").value;

  const txtBox = document.getElementById("inputbox");
  let lines = txtBox.value.split("\n");
 
  // 내용 불러오기
  let reviewContent   = "<p>";
  for (let i = 0; i < lines.length; i++) {
    reviewContent  += lines[i] + "<br />";
  }
  reviewContent  += "</p>";

  const reviewCategory = document.querySelector(".category").value;
  
  // 수리소
  const reviewPlace =  document.querySelector(".place").value;
  

  reviewForm = {reviewTitle,reviewContent,reviewCategory,reviewPlace};
  console.log(reviewForm);
}

completeBTN.addEventListener("click", clickCompleteBTN );










