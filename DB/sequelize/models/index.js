const Sequelize = require('sequelize');
const Inquiry = require('./Inquiry');
const Journal = require('./Journal');
const Member = require('./Member');
const Review = require('./Review');
const Comment = require('./Comment');
const Notice = require('./Notice');
const ProgressList = require('./ProgressList');
const UserProgressList = require('./UserProgressList');
const RepairShipList = require('./RepairShipList')


const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];


// connecting to a database
const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

const db = {};
db.sequelize = sequelize; 
db.Member = Member
db.Review = Review
db.Journal = Journal
db.Inquiry = Inquiry
db.Comment = Comment
db.Notice = Notice
db.ProgressList = ProgressList
db.UserProgressList = UserProgressList
db.RepairShipList = RepairShipList

// Sequelize adds a getter & a setter for each attribute defined through Model.init
Member.init(sequelize)
Review.init(sequelize)
Journal.init(sequelize)
Inquiry.init(sequelize)
Comment.init(sequelize)
Notice.init(sequelize)
ProgressList.init(sequelize)
UserProgressList.init(sequelize)
RepairShipList.init(sequelize)

Member.associate(db)
Review.associate(db)
Journal.associate(db)
Inquiry.associate(db)
Comment.associate(db)
UserProgressList.associate(db)

// ProgressList.create({PLName, PLExplain, PL100, PL300, PL500})
// UserProgressList.create({UPLName, UPLExplain, UPL100, UPL300, UPL500, MemberId})
// RepairShipList.create({RSName, RSRegion, RSNumber, RSAdress})


// ProgressList.create({PLName : "애노우드", PLExplain : "필요 시 점검 및 교환", PL100 : 1, PL300 : 0, PL500 : 0})
// UserProgressList.create({UPLName : "애노우드", UPLExplain : "필요 시 점검 및 교환", UPL100 :  1, UPL300 : 0, UPL500 : 0, MemberId : 1})
// RepairShipList.create({RSName : "동양FRP", RSRegion : "전라남도", RSNumber : "010-6661-8370", RSAdress : "전남 여수시 국동 25∼40 37-319"})


// ProgressList.create({PLName : "애노우드(실린더 헤드 배기관)", PLExplain : "필요 시 점검 및 교환", PL100 : 1, PL300 : 0, PL500 : 0})
// UserProgressList.create({UPLName : "애노우드(실린더 헤드 배기관)", UPLExplain : "필요 시 점검 및 교환", UPL100 :  1, UPL300 : 0, UPL500 : 0, MemberId : 1})
// RepairShipList.create({RSName : "종합전기", RSRegion : "전라남도", RSNumber : "061-553-5992", RSAdress : "전남 완도군 완도읍 군내리 310"})


module.exports = db;