// import React from "react";
// import ImageWithBasePath from "../../../core/img/imagewithbasebath";
// import { Link } from "react-router-dom";
// import { all_routes } from "../../../Router/all_routes";

// const SigninThree = () => {
//   const route = all_routes;
//   return (
//     <div className="main-wrapper">
//       <div className="account-content">
//         <div className="login-wrapper login-new">
//           <div className="container">
//             <div className="login-content user-login">
//               <div className="login-logo">
//                 <ImageWithBasePath src="assets/img/logo.png" alt="img" />
//                 <Link to={route.dashboard} className="login-logo logo-white">
//                   <ImageWithBasePath src="assets/img/logo-white.png" alt />
//                 </Link>
//               </div>
//               <form>
//                 <div className="login-userset">
//                   <div className="login-userheading">
//                     <h3>Sign In</h3>
//                     <h4>
//                       Access the Dreamspos panel using your email and passcode.
//                     </h4>
//                   </div>
//                   <div className="form-login">
//                     <label className="form-label">Email Address</label>
//                     <div className="form-addons">
//                       <input type="text" className="form-control" />
//                       <ImageWithBasePath
//                         src="assets/img/icons/mail.svg"
//                         alt="img"
//                       />
//                     </div>
//                   </div>
//                   <div className="form-login">
//                     <label>Password</label>
//                     <div className="pass-group">
//                       <input type="password" className="pass-input" />
//                       <span className="fas toggle-password fa-eye-slash" />
//                     </div>
//                   </div>
//                   <div className="form-login authentication-check">
//                     <div className="row">
//                       <div className="col-6">
//                         <div className="custom-control custom-checkbox">
//                           <label className="checkboxs ps-4 mb-0 pb-0 line-height-1">
//                             <input type="checkbox" />
//                             <span className="checkmarks" />
//                             Remember me
//                           </label>
//                         </div>
//                       </div>
//                       <div className="col-6 text-end">
//                         <Link
//                           className="forgot-link"
//                           to={route.forgotPasswordThree}
//                         >
//                           Forgot Password?
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="form-login">
//                     <Link className="btn btn-login" to={route.signin}>
//                       Sign In
//                     </Link>
//                   </div>
//                   <div className="signinform">
//                     <h4>
//                       New on our platform?
//                       <Link to={route.registerThree} className="hover-a">
//                         {" "}
//                         Create an account
//                       </Link>
//                     </h4>
//                   </div>
//                   <div className="form-setlogin or-text">
//                     <h4>OR</h4>
//                   </div>
//                   <div className="form-sociallink">
//                     <ul className="d-flex">
//                       <li>
//                         <Link to="#" className="facebook-logo">
//                           <ImageWithBasePath
//                             src="assets/img/icons/facebook-logo.svg"
//                             alt="Facebook"
//                           />
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="#">
//                           <ImageWithBasePath
//                             src="assets/img/icons/google.png"
//                             alt="Google"
//                           />
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to="#" className="apple-logo">
//                           <ImageWithBasePath
//                             src="assets/img/icons/apple-logo.svg"
//                             alt="Apple"
//                           />
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </form>
//             </div>
//             <div className="my-4 d-flex justify-content-center align-items-center copyright-text">
//               <p>Copyright © 2023 DreamsPOS. All rights reserved</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SigninThree;
