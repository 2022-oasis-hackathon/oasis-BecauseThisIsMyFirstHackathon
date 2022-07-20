
Id = Number(window.location.search.slice(4));
console.log(Id);


fetch(`http://localhost:3000/api/review/record/each?id=${Id}`)   
  .then((response) => response.text())
  .then((result) => { 
  Datas = JSON.parse(result);
  // console.log(result);
  // console.log(Datas);

  showDetails(Datas);
    
});



// 화면에 띄우는 함수
function showDetails(exDatas){
  console.log(exDatas);


  document.querySelector("#title").innerHTML = exDatas.result.reviewTitle;
  document.querySelector("#region").innerHTML = exDatas.result.reviewCategory;
  // document.querySelector("#place").innerHTML = exDatas.result.reviewTitle;    // 수리소
  document.querySelector("#author").innerHTML = exDatas.result.reviewAuthor;
  document.querySelector("#date").innerHTML = exDatas.result.createdAt.slice(0,10).replaceAll('-','.');

  let content = exDatas.result.reviewContent;
  content = content.replace('<p>','');
  content = content.replace('</p>','');
  content = content.replaceAll('<br />','\n');

  document.querySelector("#etc").innerText = content;

}

// 삭제 함수
function deleteEach(ID){
  const reviewId = ID;
  const deleteForm = {reviewId};

  fetch('http://localhost:3000/api/review/record/delete', {
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
      console.log("삭제", Datas);

      if(Datas.code===200){
        location.href='http://localhost:3000/community';
      }
     });
}


const deleteBTN = document.querySelector(".delete");
deleteBTN.addEventListener("click", event=>deleteEach(Id));



// 수정함수
function editEach(Id) {
  location.href = `http://localhost:3000/write?id=${Id}`; 
}

const editBTN = document.querySelector(".edit");
editBTN.addEventListener("click", event=>editEach(Id));









