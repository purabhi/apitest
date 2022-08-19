
const exp = require('express')
const app = exp()

//const port = process.env.portName || 8080
app.listen(process.env.PORT || 8080, function () {
    console.log('server started at port ')
})
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://purnima:dheemakachua%40123@cluster0.cxrbijc.mongodb.net/loginDetails?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })


    app.use(exp.json())
    app.use(exp.static('public'))
    app.use(exp.urlencoded({ extended: true }))
    
//--------------------Schema for person---------------------//
const persondetails = new mongoose.Schema({
    name: String,
    pass: String
})
const details = mongoose.model('details', persondetails)
app.get('/',function (req, res) {res.send('Hello World')})
app.get('/login/:name/:pass', async function (req, res) {
    try 
    {
        let name = req.params.name
        let password = req.params.pass

        if (name === undefined &&  password === undefined) {
            res.status(401).send('pls fill the fields')
        }
        else if ( name == "" && password == "") {
            res.status(401).send('pls fill the fields')
        }
        else {
            if (password == '' || password == undefined) {
                res.status(401).send('pls fill the Password field')
            }
            else if (name == '' || name == undefined) {
                res.status(401).send('pls fill the Name field')
            }
           
            else 
                {
                    const user = new details({
                        name: name,
                        pass: password
                    })
                    await user.save()
                    res.status(200).send({name})
                
            }
        }
    
    }
    
    catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})



