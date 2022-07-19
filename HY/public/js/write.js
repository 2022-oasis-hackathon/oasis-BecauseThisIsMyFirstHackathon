// 수정인 경우
if(window.location.href!='http://localhost:3000/journal/add'){
  Id = Number(window.location.search.slice(4))


  fetch(`http://localhost:3000/api/review/record/each?id=${Id}`)   
    .then((response) => response.text())
    .then((result) => { 
    Datas = JSON.parse(result);
    // console.log(result);
    console.log(Datas);


    // 값 채우기
    document.querySelector("#title").value = Datas.result.reviewTitle;

    let content = Datas.result.reviewContent;
    content = content.replace("<p>","");
    content = content.replace("</p>","");
    content = content.replaceAll("<br />","\n");
    document.querySelector("#inputbox").value = content;

    document.querySelector(".category").value = Datas.result.reviewCategory;
      
  });

}



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

  // 내용 불러오기
  const txtBox = document.getElementById("inputbox");
  let lines = txtBox.value.split("\n");
 

  let reviewContent   = "<p>";
  for (let i = 0; i < lines.length; i++) {
    reviewContent  += lines[i] + "<br />";
  }
  reviewContent  += "</p>";

  const reviewCategory = document.querySelector(".category").value;
  
  // 수리소
  const reviewPlace =  document.querySelector(".place").value;
  

  // reviewForm = {reviewTitle,reviewContent,reviewCategory,reviewPlace};         // 수리소 있는 경우
  reviewForm = {reviewTitle,reviewContent,reviewCategory}; 
  console.log(reviewForm);

  // fetch 보내기

  if(window.location.href==='http://localhost:3000/journal/add') {       // 추가
    fetch('http://localhost:3000/api/review/record', {
      headers: {
        'Content-Type': 'application/json'     
      },
      method: 'POST',
      body: JSON.stringify(reviewForm),     //객체 -> JSON
    }) 
      .then((response) => response.text())
      .then((result) => { 
        // console.log(result);
        Datas = JSON.parse(result);
        console.log(Datas);
        
        if(Datas.code===200 ){
          location.href = 'http://localhost:3000/community';
        }
      });
  }
  else{            // 수정
    reviewId = Number(window.location.search.slice(4));
    const reviewEditForm = {reviewId, reviewTitle,reviewContent,reviewCategory};


    fetch('http://localhost:3000/api/review/record/update', {
      headers: {
        'Content-Type': 'application/json'     
      },
      method: 'POST',
      body: JSON.stringify(reviewEditForm),     //객체 -> JSON
    }) 
      .then((response) => response.text())
      .then((result) => { 
        // console.log(result);
        Datas = JSON.parse(result);
        console.log(Datas);
        
        if(Datas.code===200 ){
          location.href = 'http://localhost:3000/community';
        }
      });
  }





}

completeBTN.addEventListener("click", clickCompleteBTN );










