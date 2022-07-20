var Member = require("../../DB/sequelize/models/Member")
var passport = require("passport")
var bcrypt = require("bcrypt")



const Join = async function  (JoinDTO, res, next) {
  const { memberNumber, memberPassword, memberName } = JoinDTO;
  try {
    const exMember = await Member.findOne({ where: { memberNumber } });
    if (exMember) {
      return res.redirect('/existMember');
    }
    const hash = await bcrypt.hash(memberPassword, 12);
    let member = await Member.create({
      memberNumber,
      memberPassword : hash,
      memberName
    });
    let result = {code : 200, result : member}
    return result 
  } catch (error) {
    console.error(error);
    return next(error);
  }
}
const JoinPost = async function (JoinDTO, res, next) {
  let result = await Join(JoinDTO,res,next)
  return res.send(result)
}


const Login = async function (req, res, next) {
  await passport.authenticate('local', (authError, member) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    };
    if (!member) {
      return res.send({code : 404, msg :'NO EXISTING Member'});
    };
    return req.login(member, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      };
      let result = {code : 200, result : member}
      return res.send(result)
    });
  })(req, res, next);
}
// 다시보기
const LoginPost = async function (req, res, next) {
  let result = await Login(req, res, next)
  return res.send(result)
}



const UpdatePassword = async function (UpdatePasswordDTO, res, next) {
  const { memberNumber, memberPassword } = UpdatePasswordDTO;
  let memberObj = await Member.findOne({where : {memberNumber}})
  const hash = await bcrypt.hash(memberPassword, 12);
  let member = await Member.update({
      memberNumber,
      memberPassword : hash,
      memberName : memberObj.memberName
  }, 
  {where : {id : memberObj.id}}
  );
  let result = {code : 200, result : member}
  return result
}
const UpdatePasswordPost = async function(UpdatePasswordDTO, res, next) {
  let result = await UpdatePassword(UpdatePasswordDTO, res)
  return res.send(result)
}
 
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
    return res.redirect("/before_login")
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      next();
  } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect('/');
  }
};

const LogOut = (req, res, next) => {
  req.logOut();
  req.session.save(function(err){
      if(err) throw err;
      res.redirect('/');
  })
};

const Withdrawal = async (req, res, next)  => {
  let destroy = await Member.destroy({where : {id : req.user.id}})
  let result = {code : 200, result : destroy}
  return res.send(result)
}

const Info = (req, res, next) => {
  let info = {code : 200, result : req.user}
  return info 
}

const InfoGet = (req, res, next) => {
  let result = Info(req,res,next)
  return res.send(result)
}


module.exports={Join, JoinPost, Login, LogOut, UpdatePassword, UpdatePasswordPost, Withdrawal, Info, InfoGet, isLoggedIn, isNotLoggedIn}
