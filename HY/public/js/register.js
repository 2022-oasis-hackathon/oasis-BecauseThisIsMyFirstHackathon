
// 인증X, 바로 회원가입
let registerForm;
const registerBTN = document.querySelector(".registerBTN");

function clickRegisterBTN() {
  const memberName = document.querySelector("#Name").value;
  const memberPassword = document.querySelector("#PW").value;
  const memberNumber = document.querySelector("#pNumber").value;

  registerForm = {memberName,memberPassword,memberNumber};

  console.log(registerForm);

  fetch('http://localhost:3000/api/member/join', {
    headers: {
      'Content-Type': 'application/json'     
    },
    method: 'POST',
    body: JSON.stringify(registerForm),     //객체 -> JSON
  }) 
    .then((response) => response.text())
    .then((result) => { 
      // console.log(result);
      Datas = JSON.parse(result);
      console.log(Datas);
      
      if(Datas.code===200 ){
        location.href = 'http://localhost:3000/login';
      }

     });
}

registerBTN.addEventListener("click", clickRegisterBTN);




// // 전번 입력 후 인증번호 받기
// const checkBTN = document.querySelector(".checkBTN");

// function clickCheckBTN() {
//   const memberName = document.querySelector("#Name").value;
//   const memberPassword = document.querySelector("#PW").value;
//   const memberNumber = document.querySelector("#pNumber").value;

//   document.querySelector("#checkNum").disabled = false;

//   registerForm = {memberName,memberPassword,memberNumber};

//   // console.log(registerForm);
// }

// checkBTN.addEventListener("click",clickCheckBTN);

// // 인증번호 입력 후 회원가입
// const registerBTN = document.querySelector(".registerBTN");

// function clickRegisterBTN() {
//   const checkNum = document.querySelector("#checkNum").value;
  
//   // 인증번호 맞는지 확인 코드 추가
//   console.log("인증번호:",checkNum);

//   console.log(registerForm);
// }

// registerBTN.addEventListener("click", clickRegisterBTN);

