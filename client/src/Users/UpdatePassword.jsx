import React from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePasswordAPI } from "../services/users/userService";
import { logoutAction } from "../redux/slice/authSlice";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";
import "./auth.css"; // Make sure to import your custom CSS file

const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const UpdatePassword = () => {
    const dispatch = useDispatch();
    // Mutation
    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
      mutationFn: changePasswordAPI,
      mutationKey: ["change-password"],
    });
    const formik = useFormik({
      initialValues: {
        password: "",
      },
      // Validations
      validationSchema,
      //Submit
      onSubmit: (values) => {
        //console.log(values);
        mutateAsync(values.password)
          .then((data) => {
            //Logout
            dispatch(logoutAction());
            //remove the user from storage
            localStorage.removeItem("userInfo");
          })
          .catch((e) => console.log(e));
      },
    });

  return (
    <div className="auth-page">
      <div className="form-container">
        <h2>Change Your Password</h2>
        <form onSubmit={formik.handleSubmit}>
        {isPending && <AlertMessage type="loading" message="Updating...." />}
          {isError && (
            <AlertMessage type="error" message={error.response.data.message} />
          )}
          {isSuccess && (
            <AlertMessage
              type="success"
              message="Password updated successfully"
            />
          )}
          <div className="input-group">
            <AiOutlineLock className="input-icon" />
           
            <input
              id="new-password"
              type="password"
              name="password"
              placeholder="Enter new password"
              {...formik.getFieldProps("password")}
            />
           
            {formik.touched.password && formik.errors.password && (
              <span className="error-message">{formik.errors.password}</span>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
