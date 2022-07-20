
// 로그인 입력폼
const loginBTN = document.querySelector(".loginBTN");

function clickLoginBTN(event) {
  event.preventDefault();
  const memberNumber = document.querySelector('#pNumber').value;
  const memberPassword = document.querySelector('#PW').value;

  const loginForm = {memberNumber,memberPassword};
  // console.log(loginForm);



  fetch('http://localhost:3000/api/member/login', {
    headers: {
      'Content-Type': 'application/json'     
    },
    method: 'POST',
    body: JSON.stringify(loginForm),     //객체 -> JSON
  }) 
    .then((response) => response.text())
    .then((result) => { 
      // console.log(result);
      Datas = JSON.parse(result);
      console.log(Datas);
      
      if(Datas.code===200 ){
        location.href = 'http://localhost:3000/journal';
      }
      else{
        window.alert("아이디/비밀번호를 확인해주세요!");
      }
     });

}

loginBTN.addEventListener("click", clickLoginBTN);