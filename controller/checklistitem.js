const pool = require('../db')


const createChecklistitem = async (req, res) => {
    try {
        
        if(!req.body.itemName){
            return res.status(400).json({code : 400, message : "itemName tidak boleh kosong"})
        }

        const checklist_id = parseInt(req.params.checklist_id)
        const checklistitem_nama = req.body.itemName
        const status_aktif = false

        await pool.query('insert into checklistitem_m (checklistitem_nama, status_aktif, checklist_id) values (?, ?, ?)', [checklistitem_nama, status_aktif, checklist_id])

        res.status(200).json({code : 200, message : "ok"})

    } catch (error) {
        console.log(error)
        res.status(400).json({code : 400, message : error.message})
    }
}

const getChecklistitem = async (req, res) => {
    try {

        const checklist_id = req.params.checklist_id

        const [rows] = await pool.query('select * from checklist_m where checklist_id = ?', [checklist_id])
        
        if(rows.length === 0){
            return res.status(404).json({code : 404, message : "checklist tidak ditemukan"})
        }

        const [checklistItems] = await pool.query("select * from checklistitem_m where checklist_id = ?", [checklist_id])
        
        let checklist = rows[0]
        checklist.checklistDetail = []

        if(checklistItems.length > 0){
            checklist.checklistDetail = checklist.checklistDetail.concat(checklistItems)
        }

        res.status(200).json({code : 200, message : "ok", data : checklist})

    } catch (error) {
        res.status(400).json({code : 400, message : error.message})
    }
}

module.exports = {
    createChecklistitem,
    getChecklistitem
}