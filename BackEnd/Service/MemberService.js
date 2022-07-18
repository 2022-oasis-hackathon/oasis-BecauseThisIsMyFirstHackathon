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
    return res.send({code : 200, result : member})
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

const Login = async function (LoginDTO, res, next) {
  passport.authenticate('local', (authError, member) => {
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
      return res,send({code : 200, result : member})
    });
  })(req, res, next);
}

const UpdatePassword = async function (UpdatePasswordDTO, res, next) {
  const { memberNumber, memberPassword } = UpdatePasswordDTO;
  let memberObj = Member.findOne({where : {memberNumber}})
  const hash = await bcrypt.hash(memberPassword, 12);
  let member = await Member.update({
      id : memberObj.id,
      memberNumber,
      memberPassword : hash,
      memberName : memberObj.memberName
  });
  return res.sernd({code : 200, result : member});
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

module.exports={Join, Login, UpdatePassword, isLoggedIn, isNotLoggedIn}