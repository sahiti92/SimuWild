// import React, { useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useMutation } from "@tanstack/react-query";
// import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
// import { registerAPI } from "../services/users/userService";
// import { useNavigate } from "react-router-dom";
// import AlertMessage from "../Alert/AlertMessage";
// import { Link } from "react-router-dom";

// // Validations
// const validationSchema = Yup.object({
//   username: Yup.string().required("Username is required"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters long")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirming your password is required"),
//   agreeToTerms: Yup.boolean().oneOf(
//     [true],
//     "You must agree to the terms and conditions"
//   ),
// });

// const SignupForm = () => {
//   const navigate = useNavigate();
//   const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
//     mutationFn: registerAPI,
//     mutationKey: ["register"],
//   });

//   const formik = useFormik({
//     initialValues: {
//       username: "", 
//       email: "",
//       password: "",
//       confirmPassword: "",
//       agreeToTerms: false, 
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       console.log("Submitting...");
//       console.log(values);
//       mutateAsync(values)
//         .then((data) => {
//           console.log(data);
//         })
//         .catch((e) => {
//           console.error(e);
//         });
//     },
//   });

//   useEffect(() => {
//     if (isSuccess) {
//       setTimeout(() => {
//         navigate("/dashboard"); 
//       }, 3000);
//     }
//   }, [isSuccess, navigate]);

//   return (
//     <div className ="auth-page" style={{ width: '100vw', height: '100vh' }}>
//     <div className="form-container">
//       <form onSubmit={formik.handleSubmit}>
//         <p>Want to hop right in?sign up to get started</p>
//         {isPending && <AlertMessage type="loading" message="Loading..." />}
//         {isError && (
//           <AlertMessage type="error" message={error.response.data.message} />
//         )}
//         {isSuccess && (
//           <AlertMessage type="success" message="Registration successful" />
//         )}


//         {/* Input Field - Username */}
//         <div className="input-group">
//           <FaUser className="input-icon" />
//           <input
//             id="username"
//             type="text"
//             {...formik.getFieldProps("username")}
//             placeholder="Username"
//             style={{width:"170%"}}
//           />
//           {formik.touched.username && formik.errors.username && (
//             <span className="error-message">{formik.errors.username}</span>
//           )}
//         </div>

//         {/* Input Field - Email */}
//         <div className="input-group">
//           <FaEnvelope className="input-icon" />
//           <input
//             id="email"
//             type="email"
//             {...formik.getFieldProps("email")}
//             placeholder="Email"
//             style={{width:"170%"}}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <span className="error-message">{formik.errors.email}</span>
//           )}
//         </div>

//         {/* Input Field - Password */}
//         <div className="input-group">
//           <FaLock className="input-icon" />
//           <input
//             id="password"
//             type="password"
//             {...formik.getFieldProps("password")}
//             placeholder="Password"
//             style={{width:"170%"}}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <span className="error-message">{formik.errors.password}</span>
//           )}
//         </div>

//         {/* Input Field - Confirm Password */}
//         <div className="input-group">
//           <FaLock className="input-icon" />
//           <input
//             id="confirmPassword"
//             type="password"
//             {...formik.getFieldProps("confirmPassword")}
//             placeholder="Confirm Password"
//             style={{width:"170%"}}
//           />
//           {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//             <span className="error-message">
//               {formik.errors.confirmPassword}
//             </span>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="submit-btn">
//           Register
//         </button>
//         <p style={{ marginTop: "10px", textAlign: "center" }}>
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             style={{ color: "#007BFF", textDecoration: "underline" }}
//           >
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default SignupForm;
// import React, { useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useMutation } from "@tanstack/react-query";
// import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
// import { registerAPI } from "../services/users/userService";
// import { useNavigate } from "react-router-dom";
// import AlertMessage from "../Alert/AlertMessage";
// //Validations
// const validationSchema = Yup.object({
//   username: Yup.string().required("Username is required"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters long")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirming your password is required"),
//   agreeToTerms: Yup.boolean().oneOf(
//     [true],
//     "You must agree to the terms and conditions"
//   ),
// });
// const SignupForm = () => {
//   const navigate = useNavigate();
//   const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
//     mutationFn: registerAPI,
//     mutationKey: ["register"],
//   });
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       console.log(values);
//       mutateAsync(values)
//         .then((data) => {
//           console.log(data);
//         })
//         .catch((e) => {
//           console.error(e);
//         });
//     },
//   });
//   useEffect(() => {
//     setTimeout(() => {
//       if (isSuccess) {
//         navigate("/login");
//       }
//     }, 3000);
//   }, [isPending, isError, error, isSuccess]);

//   return (
//     <form
//       onSubmit={formik.handleSubmit}
//       className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
//     >
//       <h2 className="text-3xl font-semibold text-center text-gray-800">
//         Sign Up
//       </h2>
//       {/* Display messages */}
//       {isPending && <AlertMessage type="loading" message="Loading..." />}
//       {isError && (
//         <AlertMessage type="error" message={error.response.data.message} />
//       )}
//       {isSuccess && (
//         <AlertMessage type="success" message="Registration successful" />
//       )}
//       <p className="text-sm text-center text-gray-500">
//         Join our community now!
//       </p>

//       {/* Input Field - Username */}
//       <div className="relative">
//         <FaUser className="absolute top-3 left-3 text-gray-400" />
//         <input
//           id="username"
//           type="text"
//           {...formik.getFieldProps("username")}
//           placeholder="Username"
//           className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//         />
//         {formik.touched.username && formik.errors.username && (
//           <span className="text-xs text-red-500">{formik.errors.username}</span>
//         )}
//       </div>

//       {/* Input Field - Email */}
//       <div className="relative">
//         <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
//         <input
//           id="email"
//           type="email"
//           {...formik.getFieldProps("email")}
//           placeholder="Email"
//           className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//         />
//         {formik.touched.email && formik.errors.email && (
//           <span className="text-xs text-red-500">{formik.errors.email}</span>
//         )}
//       </div>

//       {/* Input Field - Password */}
//       <div className="relative">
//         <FaLock className="absolute top-3 left-3 text-gray-400" />
//         <input
//           id="password"
//           type="password"
//           {...formik.getFieldProps("password")}
//           placeholder="Password"
//           className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//         />
//         {formik.touched.password && formik.errors.password && (
//           <span className="text-xs text-red-500">{formik.errors.password}</span>
//         )}
//       </div>

//       {/* Input Field - Confirm Password */}
//       <div className="relative">
//         <FaLock className="absolute top-3 left-3 text-gray-400" />
//         <input
//           id="confirmPassword"
//           type="password"
//           {...formik.getFieldProps("confirmPassword")}
//           placeholder="Confirm Password"
//           className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//         />
//         {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//           <span className="text-xs text-red-500">
//             {formik.errors.confirmPassword}
//           </span>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
//       >
//         Register
//       </button>
//     </form>
//   );
// };

// export default SignupForm;
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
  agreeToTerms: Yup.boolean().oneOf([true], "You must agree to the terms and conditions"),
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
        {isError && <div className="alert alert-error">{error.response.data.message}</div>}
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
          <input
            id="agreeToTerms"
            type="checkbox"
            {...formik.getFieldProps("agreeToTerms")}
          />
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
