const handleProfile = (req, res, DB) =>{
        const { id } = req.params;
        DB.select("*")
                .from("users")
                .where({ id : id })
                .then(user =>{
                        if(user.length){
                                res.json(user[0])
                        }else{
                                res.json("User doesnt exist")
                        }
                })
                .catch(err => res.status(400).json("Error fetching data"))
}

module.exports = {
        handleProfile : handleProfile
}