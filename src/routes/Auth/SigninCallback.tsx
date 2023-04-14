import React from "react";
import { useAuthContext } from "../../components/AuthProvider";

const SigninCallback = () => {
    const { signinCallback } = useAuthContext();
    signinCallback();
    return null;
};

export default SigninCallback;
