import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/learningportal.svg";
import { useLoginMutation } from "../../features/auth/authApi";
import Error from "../ui/Error";
export default function LoginhtmlForm({ value }) {
  //declare local state for form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //get the login mauation from the api
  const [login, { data, isSuccess, isError }] = useLoginMutation();
  
  //ensure that the mutation in ui level
  useEffect(() => {
    if (isError) {
      setError("Invalid Credentials");
    }

    if (isSuccess && data.user.role !== value) {
      setError("Access Denied");
    }
  }, [isError, isSuccess, data, value]);

  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //call login action
    login({ email, password });
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logo} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to {value} Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
              />
            </div>
          </div>

          {error !== "" && <Error message={error} />}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
          {/* Rgister option avilable for student only */}
          {value === "Student" && (
            <div className="flex items-center justify-center">
              <div className="text-xl hover:bg-violet-600 hover:px-2 hover:border hover:rounded hover:text-black">
                <Link
                  to="/register"
                  className="font-medium text-violet-600 hover:text-white"
                >
                  Create New Account
                </Link>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
