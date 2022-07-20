


fetch(`http://localhost:3000/api/member/infoGet`)   
  .then((response) => response.text())
  .then((result) => { 
  Datas = JSON.parse(result);
  // console.log(result);
  console.log(Datas);

  document.querySelector("#myname").innerHTML = `${Datas.result.memberName}님`;

});
