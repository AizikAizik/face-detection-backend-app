const clarifai = require("clarifai")

const app = new clarifai.App({
        apiKey: "3abddf73648e4bcba4dfe007069541c5"
    })

const handleAPICall = (req, res) =>{
        app.models.predict(clarifai.FACE_DETECT_MODEL, req.body.input)
                .then(data => {
                        res.json(data)
                })
                .catch(err => res.status(400).json("Unable to detect image"))
}
    

const handleImage = (req, res, DB) =>{
        const { id } = req.body
        DB("users")
                .where("id", "=", id)
                .increment("entries", 1)
                .returning("entries")
                .then(entry => {
                        res.json(entry[0])
                })
                .catch(err => res.status(400).json("couldnt update entry count"))

}

module. exports = { handleImage,  handleAPICall }