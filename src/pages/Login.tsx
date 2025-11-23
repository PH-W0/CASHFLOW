import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const validEmail = "user@example.com";
    const validPassword = "password123";

    if (email === validEmail && password === validPassword) {
      history.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding flex items-center justify-center bg-background">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-primary font-bold text-2xl mb-4">CASHFLW</div>

            <h1 className="text-2xl font-bold text-foreground mb-1">
              Welcome Back
            </h1>

            <IonText color="medium">
              <p className="text-sm">Sign in to your account to continue</p>
            </IonText>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <IonItem className="rounded-lg border border-input mb-2">
              <IonLabel position="stacked">Email Address</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                placeholder="Enter your email"
              />
            </IonItem>

            {/* Password */}
            <IonItem className="rounded-lg border border-input">
              <IonLabel position="stacked">Password</IonLabel>
              <div className="relative w-full">
                <IonInput
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </IonItem>

            {/* Submit */}
            <IonButton
              expand="block"
              type="submit"
              className="bg-primary text-primary-foreground rounded-lg mt-4"
            >
              Sign In
            </IonButton>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
