import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginAPI } from "../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../redux/slice/authSlice";
import "./styles.css";  // Import the new CSS file

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          dispatch(loginAction(data));
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => {
          console.error(e);
        });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <h2>Login</h2>

      {isPending && <div className="alert alert-loading">Logging you in...</div>}
      {isError && (
        <div className="alert alert-error">{error.response.data.message}</div>
      )}
      {isSuccess && <div className="alert alert-success">Login successful</div>}

      <p>Login to access your account</p>

      {/* Input Field - Email */}
      <div className="input-group">
        <FaEnvelope className="input-icon" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="error-message">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="input-group">
        <FaLock className="input-icon" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="error-message">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-btn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
