const mongoose = require('mongoose');
const { stringify } = require('querystring');

const tempImageSchema = new mongoose.Schema({
    id: 'string',
    img:
    {
        data: Buffer,
        contentType:String
    }
})



module.exports = mongoose.model('TempImage', tempImageSchema);