// 인증X, 그냥 회원가입
// let findForm;
// const complete = document.querySelector(".complete");

// function clickcomplete() {
  // const memberNumber = document.querySelector('#pNumber').value;
  // const memberPassword = document.querySelector("#newPW").value;
  
  // findForm = {memberNumber,memberPassword};

  // console.log(findForm);

  // fetch('http://localhost:3000/api/member/updatePassword', {
  //   headers: {
  //     'Content-Type': 'application/json'     
  //   },
  //   method: 'POST',
  //   body: JSON.stringify(findForm),     //객체 -> JSON
  // }) 
  //   .then((response) => response.text())
  //   .then((result) => { 
  //     // console.log(result);
  //     Datas = JSON.parse(result);
  //     console.log(Datas);
      
  //     if(Datas.code===200 ){
  //       // location.href = 'http://localhost:3000/login';
  //       window.history.back();
  //     }
  //    });
// }

// complete.addEventListener("click", clickcomplete);




let CHECK;

// 전화번호 입력 후 인증번호 받기 
const checkBTN = document.querySelector('.checkBTN');

function clickCheckBTN()  {
  const memberNumber = document.querySelector('#pNumber').value;
  document.querySelector('#pNumber').disabled = true;
  console.log("전화번호:",memberNumber);

  document.querySelector('#checkNum').disabled = false;



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

} 

checkBTN.addEventListener("click",clickCheckBTN )


// 인증번호 입력 후 확인
const registerBTN = document.querySelector(".registerBTN");

function clickRegisterBTN() {
  const checkNum = document.querySelector("#checkNum").value;
  console.log("인증번호:",checkNum);




  const userCheck = Number(document.querySelector("#checkNum").value);

  console.log(CHECK);
  console.log(userCheck===CHECK);

  
  if(userCheck===CHECK){
    document.querySelector('#newPW').disabled = false;
  }
  else{
    window.alert("인증번호를 확인해주세요");
  }

}

registerBTN.addEventListener("click", clickRegisterBTN);




// 새 비밀번호 입력 후 완료
const complete = document.querySelector(".complete");
let findForm;

function clickcomplete() {
  const newPW = document.querySelector("#newPW").value;
  console.log("새 비밀번호:",newPW);

  const memberNumber = document.querySelector('#pNumber').value;
  const memberPassword = document.querySelector("#newPW").value;
  
  findForm = {memberNumber,memberPassword};

  console.log(findForm);

  fetch('http://localhost:3000/api/member/updatePassword', {
    headers: {
      'Content-Type': 'application/json'     
    },
    method: 'POST',
    body: JSON.stringify(findForm),     //객체 -> JSON
  }) 
    .then((response) => response.text())
    .then((result) => { 
      // console.log(result);
      Datas = JSON.parse(result);
      console.log(Datas);
      
      if(Datas.code===200 ){
        window.history.back();
      }
     });


}

complete.addEventListener("click", clickcomplete);