import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub, FaApple } from "react-icons/fa";

export function Login() {
  const {
    login,
    loginWithGoogle,
    loginWithFacebook,
    loginWithGitHub,
    loginWithApple,
  } = useAuth();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push("/dashboard");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleSocialLogin = async (loginFn: () => Promise<void>) => {
    try {
      await loginFn();
      history.push("/dashboard");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="text-primary font-bold text-2xl">CASHFLW</div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Email/Password Sign In */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity mt-4"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-sm text-muted-foreground">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleSocialLogin(loginWithGoogle)}
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold py-3 rounded-lg border hover:opacity-90 transition-opacity"
            >
              <FcGoogle size={20} />
              Sign in with Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin(loginWithFacebook)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaFacebookF size={20} />
              Sign in with Facebook
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin(loginWithGitHub)}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaGithub size={20} />
              Sign in with GitHub
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin(loginWithApple)}
              className="w-full flex items-center justify-center gap-2 bg-black text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              <FaApple size={20} />
              Sign in with Apple
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
