
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { registerAPI } from "../services/users/userService";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";
import "./auth.css"; // Import the CSS file
 import { Link } from "react-router-dom";

// Validation schema
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
  
});

const SignupForm = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="auth-page" style={{ width: '100vw', height: '100vh' }}>
      <form onSubmit={formik.handleSubmit} className="form-container">
        <h2>Sign Up</h2>

        {isPending && <div className="alert alert-loading">Loading...</div>}
        {/* {isError && <div className="alert alert-error">{error.response.data.message}</div>} */}
        {isSuccess && <div className="alert alert-success">Registration successful</div>}

        <p>Join our community now!</p>

        {/* Input Field - Username */}
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            id="username"
            type="text"
            {...formik.getFieldProps("username")}
            placeholder="Username"
            style={{ width: "170%" }}
          />
          {formik.touched.username && formik.errors.username && (
            <span className="error-message">{formik.errors.username}</span>
          )}
        </div>

        {/* Input Field - Email */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            style={{ width: "170%" }}
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
            style={{ width: "170%" }}
          />
          {formik.touched.password && formik.errors.password && (
            <span className="error-message">{formik.errors.password}</span>
          )}
        </div>

        {/* Input Field - Confirm Password */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            id="confirmPassword"
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            placeholder="Confirm Password"
            style={{ width: "170%" }}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="error-message">{formik.errors.confirmPassword}</span>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="input-group">
          {/* <input
            id="agreeToTerms"
            type="checkbox"
            {...formik.getFieldProps("agreeToTerms")}
          /> */}
          {/* <label htmlFor="agreeToTerms">I agree to the terms and conditions</label>
          {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
            <span className="error-message">{formik.errors.agreeToTerms}</span>
          )} */}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Register
        </button>
        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Already have an account?{" "}
           <Link
             to="/login"
             style={{ color: "#007BFF", textDecoration: "underline" }}
           >
             Login
           </Link>
         </p>
      </form>
    </div>
  );
};

export default SignupForm;
