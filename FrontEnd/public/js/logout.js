

const logoutBTN = document.querySelector(".logout");

function clickLogout() {
  console.log("로그아웃");


  fetch(`http://localhost:3000/api/member/logout`)   
  .then((response) => response.text())
  .then((result) => { 
  // Datas = JSON.parse(result);
  console.log(result);
  // console.log(Datas);

    location.href="/";
    
});

}

logoutBTN.addEventListener("click", clickLogout);