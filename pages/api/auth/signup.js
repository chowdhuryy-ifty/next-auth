import connectMongo from "../../../database/conn";
import CustomUsers from "../../../models/userModel";
import {hash} from "bcrypt";

export default async function handler(req, res) {
    connectMongo().catch(error => res?.json({error: "Connection Failed......!"}))
    if (req.method === 'POST') {
        if (!req.body) return res?.status(404)?.json({error: "Don't Have form data"})

        const {username, email, password, token} = req.body

        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            }, method: "POST",
        });

        const captchaValidation = await response.json();
        if (captchaValidation.success) {
            //check duplicate users
            const checkExisting = await CustomUsers.findOne({email});
            if (checkExisting) return res?.status(442)?.json({message: "JSON User already Exists !!"})
            CustomUsers.create({username, email, password: await hash(password, 12)}, function (err, data) {
                if (err) return res?.status(404)?.json({err});
                res?.status(201)?.json({status: true, user: data})
            })
        } else {
            return res.status(442).json({
                message: "Unprocessable request, Invalid captcha code",
            })
        }

    } else {
        res?.status(500)?.json({message: "HTTP method not valid only POST accepted"})
    }
}