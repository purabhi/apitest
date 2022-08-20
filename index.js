
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
app.get('/personRegister/users', async function (req, res) {
    try {

       
        let name = req.query.name;
        let password = req.query.pass;

        if (name === undefined &&  password === undefined) {
            res.status(401).send('pls fill the fields')
        }
        else if ( name == "" && password == "") {
            res.status(401).send('pls fill the fields')
        }
        else {
            if (name == '' || name == undefined) {
                res.status(401).send('pls fill the name field')
            }
            else if (password == '' || password == undefined) {
                res.status(401).send('pls fill the Password field')
            }
            else {
                const user = await details.findOne({ pass: password })
                if (user) {
                    res.status(401).send('User already exists')
                }
                else {
                    const user = new details({
                        name: name,
                     
                        pass: password
                    })
                    await user.save()
                    res.status(200).send('Registerd successfully')
                }
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})


app.get('/personLogin/users', async function (req, res) {

    try {
        let name = req.query.name
        let password = req.query.pass
       
        
        if (name == "" && password == "") {
            res.status(401).send("Please Fill All Fields Properly")
        }
        else if (name === undefined && password === undefined) {
            res.status(401).send("Please Fill All Fields Properly")
        }
        else {
            if (name == undefined || name == "") {
                res.send("Please Fill the Name Field ")
            }
            else if (password == undefined || password == "") {
                res.status(401).send("Please Fill the password ")
            }
            else {

                    const user1 = await details.findOne({ pass: req.query.pass })
                    res.status(201).send({user1})
                       
                    }
                }
            }
        
    
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
})



