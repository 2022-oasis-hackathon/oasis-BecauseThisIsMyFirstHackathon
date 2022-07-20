
// {
//   "code": 200,
//   "info": {
//       "phone": "01033957430",
//       "body_content": "[인증 요청] 3645 "
//   }
// }








// 인증X, 바로 회원가입
let CHECK;
let registerForm;
const registerBTN = document.querySelector(".registerBTN");

function clickRegisterBTN() {
  const memberName = document.querySelector("#Name").value;
  const memberPassword = document.querySelector("#PW").value;
  const memberNumber = document.querySelector("#pNumber").value;

  registerForm = {memberName,memberPassword,memberNumber};

  console.log(registerForm);


  // 전화번호 입력, 인증번호 입력 후 인증번호 확인
  const userCheck = Number(document.querySelector("#checkNum").value);

  console.log(CHECK);
  console.log(userCheck===CHECK);


  if(userCheck===CHECK){
    fetch('http://localhost:3000/api/member/join', {
      headers: {
        'Content-Type': 'application/json'     
      },
      method: 'POST',
      body: JSON.stringify(registerForm),     //객체 -> JSON
    }) 
      .then((response) => response.text())
      .then((result) => { 
        console.log(result);
        // Datas = JSON.parse(result);
        // console.log(Datas);
        
        if(Datas.code===200 ){
          location.href = 'http://localhost:3000/login';
        }
  
       });
  }
  else{
    window.alert("인증번호를 확인해주세요");
  }










}

registerBTN.addEventListener("click", clickRegisterBTN);




// 전번 입력 후 인증번호 받기
const checkBTN = document.querySelector(".checkBTN");

function clickCheckBTN() {
  const memberNumber = document.querySelector("#pNumber").value;

  fetch(`http://localhost:3000/api/sms/random?phone=${memberNumber}`)   
  .then((response) => response.text())
  .then((result) => { 
  Datas = JSON.parse(result);
  console.log(result);
  console.log(Datas);

  CHECK = Number(Datas.info.body_content.slice(8));
  console.log(CHECK);
  console.log(typeof(CHECK));

  });


  document.querySelector("#checkNum").disabled = false;


}

checkBTN.addEventListener("click",clickCheckBTN);
