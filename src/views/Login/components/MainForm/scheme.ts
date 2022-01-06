import * as yup from "yup";

export const validationSchema = yup.object({
    email: yup.string().email("Please Type Email").required("Required Email"),
    password: yup.string().required("Please Type Password")
});