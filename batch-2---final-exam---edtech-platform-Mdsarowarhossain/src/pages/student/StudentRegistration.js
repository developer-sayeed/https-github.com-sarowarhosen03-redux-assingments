import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/image/learningportal.svg";
import Error from "../../components/ui/Error";
import { useRegisterMutation } from "../../features/auth/authApi";
export default function StudentRegistration() {
  document.title = "Student Registration";


  //defining the local states
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const naviget = useNavigate();

  //mutation query
  const [register, { isSuccess, isError, error: registerError }] =
    useRegisterMutation();

  //handle mutation success and error
  useEffect(() => {
    if (isSuccess) naviget("/course");
    if (isError)
      setError(registerError?.data || "Error occured while registering");
  }, [isSuccess, isError, naviget, registerError]);

  //handle form submission

  const handelSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (password !== cpassword) setError("Password does not match");

    //disptech resgister mutation
    register({
      name,
      email,
      password,
      role: "student",
    });
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logoImage} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handelSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="login-input rounded-t-md"
                placeholder="Student Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input "
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                onChange={(e) => setCpassword(e.target.value)}
                value={cpassword}
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="confirm-password"
                required
                className="login-input rounded-b-md"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          {error !== "" && <Error message={error} />}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Create Account
            </button>

            <div className="flex mt-4 items-center justify-center">
              <div className="text-xl hover:bg-violet-600 hover:px-2 hover:border hover:rounded hover:text-black">
                <Link
                  to="/"
                  className="font-medium  text-violet-600 hover:text-white"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
