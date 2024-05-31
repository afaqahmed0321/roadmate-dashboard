import * as Yup from "yup";

export const loginSchema = Yup.object({
  identifier: Yup.string().required("Please Enter your email or phone *"),
  password: Yup.string().required("Please Enter your password *"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  // ),
});

export const forgotSchema = Yup.object({
  identifier: Yup.string().required("Please Enter your email or phone *"),
});
