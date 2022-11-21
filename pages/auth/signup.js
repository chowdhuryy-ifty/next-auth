import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import SignupForm from "../../Components/SignUpForm";


const Signup = () => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
            <SignupForm/>
        </GoogleReCaptchaProvider>
    )
}

export default Signup