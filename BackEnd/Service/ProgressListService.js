var UserProgressList = require("../../DB/sequelize/models/UserProgressList")
var Journal  = require("../../DB/sequelize/models/Journal")
const { Op } = require('sequelize');
const { sequelize } = require("../../DB/sequelize/models");

const Post = {
    pl : async function(PLDTO, res, next) {
        const { PLName, PL100, PL300, PL500, userObj, checkDate, checkList } = PLDTO
        console.log(PLDTO)
        console.log(checkList)
        let journalObj = await Journal.findAndCountAll({where : 
        { 
            [Op.or]: [
                {MemberId :userObj.id},
                {
                    journalDate: {
                    [Op.lt]: checkDate
                    }
                }
            ]

        }})
        let hours = journalObj.rows.map(res => res.journalHours)
        let hour = 0;
        for (h of hours) {
            hour = hour + h
        }
        let totalHour = hour
        let pl = await UserProgressList.findAndCountAll()
        let tempObj = Inner.range(totalHour, pl)
        let upadateObj = await Promise.all(
            checkList.map(res =>            
            sequelize.query(`UPDATE userprogresslist
            SET  U${tempObj.plTime} = 0
            WHERE MemberId = ${userObj.id} AND id = ${res};`))
        )
        let result = {code : 200, upadateObj}
        return result
    },
    plPost : async function(PLDTO, res, next) {
        let result = await Post.pl(PLDTO)
        return res.send(result)

    }
}

const Get = {

    pl : async function (PLDTO, res, next) {
        const {userObj} = PLDTO
        let journalObj = await Journal.findAndCountAll({where : {MemberId :userObj.id }})
        let hours = journalObj.rows.map(res => res.journalHours)
        let hour = 0;
        for (h of hours) {
            hour = hour + h
        }
        let totalHour = hour
        let pl = await UserProgressList.findAndCountAll({where : {MemberId : userObj.id}})
        let tempObj = Inner.range(totalHour, pl)
        let i = 0;
        let result = []
        tempObj.pl.forEach(element => {
            if(element != null) {
                result[i] = {}
                result[i]["id"] = pl.rows[i].id
                result[i]["UPLName"] = pl.rows[i].UPLName
                result[i]["UPLExplain"] = pl.rows[i].UPLExplain
            }
            i++
        });
        resultTemp = {code : 200, result, currentHour : tempObj.currentHour, maxHour : tempObj.maxHour}
        return resultTemp
    },

    plGet : async function(PLDTO, res, next) {
        let result = await Get.pl(PLDTO,res,next)
        return res.send(result)
    }

}

// inner Function
const Inner = {
    range : function(hour, pl) {
        if (hour >= 0 && hour <= 99) {
            let hourObj ={
                currentHour : hour,
                plTime : "PL100",
                maxHour : 100,
                pl : pl.rows.map(res => res.UPL100)
            }
            return hourObj
        }
        if (hour >= 100 && hour <= 299) {
            let hourObj = {
                currentHour : hour-100,
                plTime : "PL300",
                maxHour : 300,
                pl : pl.rows.map(res => res.UPL300)
            }
            return hourObj
        }
        if (hour >= 299 && hour <= 500) {
            let hourObj = {
                currentHour : hour-300,
                plTime : "PL500",
                maxHour : 500,
                pl : pl.rows.map(res => res.UPL500)

            }
            return hourObj
        }
    }
}

module.exports = {Post, Get};
