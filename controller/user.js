const pool = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config')

const register = async(req, res) => {
    try {
        
        if(!req.body.email){
            return res.status(400).json({code : 400, message : "email tidak boleh kosong"})
        }

        if(!req.body.username){
            return res.status(400).json({code : 400, message : "username tidak boleh kosong"})
        }

        if(!req.body.password){
            return res.status(400).json({code : 400, message : "password tidak boleh kosong"})
        }

        const email = req.body.email
        const username = req.body.username
        const password = req.body.password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query('insert into pengguna_m (email, username, password) values (?, ?, ?)', [email, username, hashedPassword])

        res.status(200).json({code : 200, message : "Ok"})


    } catch (error) {
        res.status(400).json({code : 400, message : error.message})
    }
}


const login = async (req, res) => {
    try {
        
        if(!req.body.username){
            return res.status(400).json({code : 400, message : "username tidak boleh kosong"})
        }

        if(!req.body.password){
            return res.status(400).json({code : 400, message : "password tidak boleh kosong"})
        }

        const username = req.body.username
        const password = req.body.password

        const [rows] = await pool.query("select * from pengguna_m where username = ?", [username]);
        if(rows.length === 0){
            return res.status(404).status({code : 404, message : "Akun tidak ditemukan"})
        }

        const isMatch = await bcrypt.compare(password, rows[0].password);

        if (!isMatch) {
            return res.status(401).json({code : 401, message : "Unauthorized"})
        }

        const payload = {
            pengguna_id: rows[0].pengguna_id,
            username: rows[0].username,
        };

        console.log('payload', payload);

        const token = jwt.sign(payload, config.JWT_SECRET_KEY);

        res.status(200).json({code : 200, message : "ok", data : {token : token}})
        

    } catch (error) {
        res.status(400).json({code : 400, message : error.message})
    }
}


module.exports = {
    register,
    login
}
