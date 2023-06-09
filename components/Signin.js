import Link from "next/link";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../styles/Signin.module.css";
import pino from "../logger";
import { signInSchema } from "./Validation_Schema";

const initialValues = {
  email: "",
  password: "",
};

const Signin = ({ setView }) => {
  const router = useRouter();

  const notifyError = () =>
    toast.error("Invalid Credentials!", {
      position: toast.POSITION.TOP_CENTER,
    });
  const notifySigninError = () =>
    toast("Invalid! You need to register yourself before login!", {
      position: toast.POSITION.TOP_CENTER,
    });
  const notify = () =>
    toast.success("You have logged in successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchema,
      onSubmit: (values, action) => {
        try {
          const getUserData = localStorage.getItem("registration");
          action.resetForm();
          if (!getUserData) {
            notifySigninError();
            setTimeout(() => {
              router.push("/registration");
            }, 5000);
          } else if (getUserData && getUserData.length) {
            const userData = JSON.parse(getUserData);
            const userLogin = userData.filter((res, key) => {
              return (
                res.email === values.email && res.password === values.password
              );
            });
            if (userLogin.length === 0) {
              notifyError();
            } else {
              localStorage.setItem("user_login", JSON.stringify(getUserData));
              notify();
              setTimeout(() => {
                router.push("/documents");
                setView(true);
              }, 3000);
            }
          }
        } catch (error) {
          router.push("/500");
          pino.info(`Error: ${error}`);
        }
      },
    });

  return (
    <div className={styles.signin_form_container}>
      <form className={styles.form_signin} onSubmit={handleSubmit}>
        <header className={styles.heading}>
          <h1>Login</h1>
        </header>
        <div className={`mb-3 ${styles.form_control}`}>
          <input
            type="email"
            className={`form-control`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            placeholder="Email Address"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <p className={styles.form_error}>{errors.email}</p>
          ) : null}
          <div id="emailHelp" className={`form-text`}>
            We will never share your email with anyone else.
          </div>
        </div>
        <div className={`mb-3 ${styles.form_control}`}>
          <input
            type="password"
            className={`form-control`}
            id="exampleInputPassword1"
            name="password"
            placeholder="Password"
            autoComplete="off"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p className={styles.form_error}>{errors.password}</p>
          ) : null}
        </div>
        <div className={`mb-3 ${styles.form_check}`}>
          <label className={`form-check-label`} htmlFor="exampleCheck1">
            <Link href="/registration" className={styles.accountcolor}>
              Create an account
            </Link>
          </label>
        </div>
        <div className={`d-grid gap-2`}>
          <button
            type="submit"
            className={`btn btn-primary ${styles.button_arjust}`}
            disabled={!values.email || !values.password}
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signin;
