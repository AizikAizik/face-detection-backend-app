const handleRegister = (req, res, DB, bcrypt) =>{
        const { email, name, password } = req.body

        if(!email || !name || !password){
                return res.status(400).json("One or more fields are empty")
        }
        const hash = bcrypt.hashSync(password, 10)
        DB.transaction(trx => {
                trx.insert({
                        hash : hash,
                        email : email
                })
                .into("login")
                .returning("email")
                .then(loginEmail => {
                        return trx("users")
                                .returning("*")
                                .insert({
                                        email : loginEmail[0],
                                        name : name,
                                        joined : new Date()
                                })
                                .then(user => {
                                        res.json(user[0])
                                })
                }).then(trx.commit)
                   .catch(trx.rollback)
        })
}


module.exports = {
        handleRegister : handleRegister
}