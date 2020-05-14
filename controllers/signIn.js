const handleSignIn = (DB, bcrypt) => (req, res) =>{
        const { email, password } = req.body

        if(!email || !password){
                return res.status(400).json("One or more fields are empty")
        }
 
        DB.select("email", "hash").from("login")
                 .where("email", "=", email)
                 .then(data => {
                         const isValid = bcrypt.compareSync(password, data[0].hash)
                         if(isValid){
                                return DB.select("*").from("users")
                                 .where("email", "=", email)
                                 .then(user => {
                                         res.json(user[0])
                                 })
                                 .catch(err => {
                                         res.status(400).json(err)
                                 })
                         }else{
                                 res.status(400).json("wrong email or password")
                         }
                 })
                 .catch(err => res.status(400).json("Wrong credentials"))
 }

 module.exports = {
         handleSignIn : handleSignIn
 }