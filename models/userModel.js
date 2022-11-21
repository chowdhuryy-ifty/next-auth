import {model, models, Schema} from 'mongoose'

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

const CustomUsers = models.user || model('user', userSchema)
export default CustomUsers