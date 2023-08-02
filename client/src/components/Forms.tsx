import * as yup from "yup";
import { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { HiUser, HiEnvelope, HiLockClosed } from "react-icons/hi2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alerts from "./Alerts";

interface Inputs {
  username?: string;
  email: string;
  password: string;
}

interface UserRegister {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

interface UserLogin {
  token: string;
  user: {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
  } 
}

const initialValuesRegister: Inputs = {
  username: "",
  email: "",
  password: "",
};

const initialValuesLogin: Inputs = {
  email: "",
  password: "",
};

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("This field is required")
    .min(2, "Must be 2-50 characters")
    .max(50, "Must be 2-50 characters"),
  email: yup
    .string()
    .email("Invalid email")
    .required("This field is required")
    .lowercase(),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+])[A-Za-z\d!@#$%^&*()\-_=+]+$/,
      "Password must be strong. Use at least 8 characters, with uppercase letters, digits, and symbols (!@#$%^&*()\-_=+)."
    ),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("This field is required")
    .lowercase(),
  password: yup.string().required("This field is required"),
});

const dbApi: string = import.meta.env.VITE_DB_API as string;

const Forms = () => {
  const navigate = useNavigate();
  const [pageType, setPageType] = useState<string>("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const register = async (values: Inputs, onSubmitProps: FormikHelpers<Inputs>) => {
    setErrorMessage(null);
    try {
      const savedUserResponse = await axios.post(`${dbApi}/auth/register`, {
        username: values.username,
        email: values.email,
        password: values.password
      })

      const savedUser: UserRegister = await savedUserResponse.data as UserRegister;
      onSubmitProps.resetForm();

      console.log(savedUser)

      if (savedUser) {
        setPageType("login");
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const err = (error.response.data as { message: string }).message;
          console.log(err)
          setErrorMessage(err)
        } else {
          console.log('Error:', error.message);
        }
      } else {
        console.log(error);
      }
    }
  };

  const login = async (values: Inputs, onSubmitProps: FormikHelpers<Inputs>) => {
    try {
      const response = await axios.post(`${dbApi}/auth/login`, values);
      const loggedIn: UserLogin = response.data as UserLogin;

      if (loggedIn) {
        // data saved in redux persist
        
        console.log(loggedIn)
        onSubmitProps.resetForm();
        navigate('/');
      }

    } catch (error) {
      console.log(error)
    }
  };

  const handleFormSubmit = async (values: Inputs, onSubmitProps: FormikHelpers<Inputs>) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 mt-10">
            {isRegister && (
              <div className="relative">
                <div className="absolute p-1 border-2 rounded-lg border-neutral-500">
                  <HiUser size={28} />
                </div>
                <div className="w-full pl-12">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className="w-full py-2 px-4 font-open rounded-lg"
                  />
                  {errors.username && touched.username && (
                    <p className="font-open pl-4 text-red-500 pt-1 font-semibold text-sm">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="relative">
              <div className="absolute p-1 border-2 rounded-lg border-neutral-500">
                <HiEnvelope size={28} />
              </div>
              <div className="w-full pl-12">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="w-full py-2 px-4 font-open rounded-lg"
                />
                {errors.email && touched.email && (
                  <p className="font-open pl-4 text-red-500 pt-1 font-semibold text-sm">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="absolute p-1 border-2 rounded-lg border-neutral-500">
                <HiLockClosed size={28} />
              </div>
              <div className="w-full pl-12">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="w-full py-2 px-4 font-open rounded-lg"
                />
                {errors.password && touched.password && (
                  <p className="font-open pl-4 text-red-500 pt-1 font-semibold text-sm">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="p-2 rounded-lg font-poppins bg-gradient-to-r from-[#F90B0B] from-[20%] to-[#F89234] to-[80%] text-white font-semibold"
            >
              {isSubmitting ? (
                  isLogin ? "Logging in..." : "Registering..."
                ) : (
                  isLogin ? "LOGIN" : "REGISTER"
                )}
            </button>

            {errorMessage && <p className="text-red-500 font-poppins font-semibold text-center">
              {errorMessage}
            </p>}

            <p 
              className="text-center underline font-poppins cursor-pointer"
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
                setErrorMessage(null)
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </p>
          </form>
        )}
      </Formik>

    </div>
  );
};

export default Forms