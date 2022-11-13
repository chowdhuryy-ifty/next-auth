import {Schema, model, models} from 'mongoose'

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
})

const CustomUsers = models.user || model('user', userSchema)
export default CustomUsers