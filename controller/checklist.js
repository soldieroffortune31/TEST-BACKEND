const pool = require('../db')


const getCheckList = async (req, res) => {
    try {
        
        const [rows] = await pool.query('select * from checklist_m where pengguna_id = ?', [req.user.pengguna_id])

        console.log(rows)

        res.status(200).json({code : 200, message : "ok", data : rows})

    } catch (error) {
        res.status(400).json({code : 400, message : error.message})
    }
}

const createChecklist = async (req, res) => {
    try {

        if(!req.body.name){
            return res.status(400).json({code : 400, message : "name tidak boleh kosong"})
        }

        const checklist_nama = req.body.name
        const pengguna_id = req.user.pengguna_id

        await pool.query('insert into checklist_m (checklist_nama, pengguna_id) values (?, ?)', [checklist_nama, pengguna_id])

        res.status(200).json({code : 200, message : "Data Berhasil Disimpan"})

    } catch (error) {
        res.status(400).json({code : 400, message : error.message})
    }
}

const deleteCheckList = async (req, res) => {
    try {
        
        const id = req.params.id

        await pool.query('delete from checklist_m where checklist_id = ?', [id])

        res.status(200).json({code : 200, message : "Data berhasil dihapus"})

    } catch (error) {
        res.status(400).json({code : 400, message : error.message})
    }
}

module.exports = {
    getCheckList,
    createChecklist,
    deleteCheckList
}