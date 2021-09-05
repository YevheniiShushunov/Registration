const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 8;

class UserController {
    async signUp (req, res) {
        const {email, login, real_name, password, birth_date, country, agree_condition} = req.body.data;
        console.log(req.body)
        const hashPassword = await bcrypt.hash(password, saltRounds);

        await db.query(`INSERT INTO user (email, login, real_name, password, birth_date, country, registration, agree_condition) 
            VALUES(?, ?, ?, ?, ?, ?, UNIX_TIMESTAMP(), ?);`, [email, login, real_name, hashPassword, birth_date, country, agree_condition],
                    (err,rows) => {
                        if(err){
                            console.log(err);
                            res.send(err);
                        }else{

                            res.json({status:'ok'});
                        }
                    })
    console.log('user created');
    }

    async signIn (req, res) {
        const {email, login} = req.body;
        await db.query(
            `SELECT * FROM user WHERE email OR login = ?;`, [email, login],
            (err, rows, fields) => {
                if(err) {
                    res.send(err);
                } else if (rows.length <= 0 ){
                    res.send({message: `user not found`});
                } else {
                    const row = JSON.parse(JSON.stringify(rows));
                    row.map(async rw => {
                        const password =  await bcrypt.compare(req.body.password, rw.password);
                        if(password) {
                            const token = jwt.sign({
                                userId: rw.id,
                                email: rw.email
                            }, process.env.jwt, {expiresIn: 120*120} );
                            res.json([{token,
                                id: rw.id,
                                email:rw.email,
                                login: rw.login,
                                real_name: rw.real_name
                            }]);
                        } else {
                            res.json({message:`wrong password`});
                        }
                        return true;
                    })
                }
            }
        )
    }

    async auth (req, res) {
        console.log(req.user);
            res.send(req.user)  
    }
    
    

    async getCountries (req, res) {
        await db.query("SELECT * FROM country",
            (err, rows) => {
                if(err) {
                    console.log(err)
                }else{
                res.json(rows);
                } 
            }
        )  
    }
}

module.exports = new UserController;