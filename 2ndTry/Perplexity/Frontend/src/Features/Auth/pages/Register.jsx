import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister } = useAuth();

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      username,
      email,
      password,
    };
    await handleRegister(username, email, password);

    console.log("Register Payload", payload);

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8 overflow-hidden bg-bg-dark font-body">

      {/* Aurora backdrop — same as dashboard/login */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-24 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[26rem] h-[26rem] bg-secondary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#0B1412" />
            </svg>
          </div>

          <h1 className="font-heading text-2xl font-semibold text-text-inverse">
            Perplexity
          </h1>

          <p className="mt-2 text-sm text-text-inverse-muted">
            Create your account and start exploring.
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-glass-bg-dark backdrop-blur-xl border border-glass-border-dark rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_var(--color-glass-shadow-dark)] relative">

          <div className="absolute inset-x-0 top-0 h-px bg-glass-highlight-dark rounded-t-2xl" />

          <form onSubmit={submitForm} className="space-y-5">

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2 text-text-inverse">
                Username
              </label>

              <input
                id="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="Enter your username"
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/5 border border-glass-border-dark
                  text-text-inverse placeholder:text-text-inverse-muted
                  outline-none transition
                  focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                  focus:bg-white/[0.08]
                "
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-inverse">
                Email
              </label>

              <input
                id="email"
                value={email}
                required
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Enter your email"
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/5 border border-glass-border-dark
                  text-text-inverse placeholder:text-text-inverse-muted
                  outline-none transition
                  focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                  focus:bg-white/[0.08]
                "
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-text-inverse">
                Password
              </label>

              <input
                id="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Create a password"
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/5 border border-glass-border-dark
                  text-text-inverse placeholder:text-text-inverse-muted
                  outline-none transition
                  focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                  focus:bg-white/[0.08]
                "
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="
                w-full py-3 px-4 rounded-xl
                bg-primary text-bg-dark font-heading font-semibold
                transition hover:bg-primary-hover active:scale-[0.98]
                shadow-[0_4px_20px_rgba(34,195,154,0.25)]
              "
            >
              Create account
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-text-inverse-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:text-primary-hover transition">
              Sign in
            </Link>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-text-inverse-muted mt-6">
          By creating an account, you agree to our Terms and Privacy Policy.
        </p>

      </div>
    </div>
  );
};

export default Register;
