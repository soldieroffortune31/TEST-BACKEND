const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const PORT = 3000; 

const user = require('./controller/user')
const auth = require('./middleware/index')
const checklist = require('./controller/checklist')
const checklistItem = require('./controller/checklistitem')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
  res.send('Selamat datang di aplikasi Express.js!');
});

app.post('/register', user.register)
app.post('/login', user.login)


app.get('/checklist', auth.auth ,checklist.getCheckList)
app.post('/checklist', auth.auth, checklist.createChecklist)
app.delete('/checklist/:id', auth.auth, checklist.deleteCheckList)

app.post('/checklist/:checklist_id/item', auth.auth, checklistItem.createChecklistitem)
app.get('/checklist/:checklist_id/item', auth.auth, checklistItem.getChecklistitem)

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});