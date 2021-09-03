const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 8;

class UserController {
    async signUp (req, res) {
        const {email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        await db.query(`INSERT INTO user (email, password,  
            registration) values(?, ?,NOW());`, 
                 [email,hashPassword],
                    (err, result) => {
                       console.log(err);   
                    })
                
        res.json('ok');
        console.log('user created');
    }

    async signIn (req, res) {
        const {email} = req.body;
        await db.query(
            `SELECT * FROM user WHERE email = ?;`, [email],
            (err, rows, fields) => {
                console.log(rows)
                if(err) {
                    res.send(err);
                } else if (rows.length <= 0 ){
                    res.send({message: `user not found`});
                } else {
                    const row = JSON.parse(JSON.stringify(rows));
                    row.map(async rw => {
                        const password =  await bcrypt.compare(req.body.password, rw.password);
                        console.log(password)
                        if(password) {
                            const token = jwt.sign({
                                userId: rw.id,
                                email: rw.email
                            }, process.env.jwt, {expiresIn: 120*120} );
                            res.json({token,
                                email:req.body.email
                            });
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
        
           /*  const token = jwt.sign({
                userId: req.body.id,
                email: req.body.email,
                
            }, process.env.jwt, {expiresIn: 120*120} ); */
            res.send(req.user.profile)
            /* res.json({'profile': req.body.user}); */
        
    }
    
    

    async getCountries (req, res) {
        const countries = await db.query("SELECT * FROM country");
        res.json(countries);
    }
}

module.exports = new UserController;