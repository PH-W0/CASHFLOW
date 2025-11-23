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

export function Signup() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Here you would normally call an API or Firebase to register
    alert(`Account created for ${email}`);
    history.push("/login");
  };

  return (
    <IonPage>
      <IonContent className="bg-background">
        {/* Full-height flex container */}
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-sm">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-primary font-bold text-2xl mb-4">CASHFLW</div>

              <h1 className="text-2xl font-bold text-foreground mb-1">
                Create Account
              </h1>

              <IonText color="medium">
                <p className="text-sm">Sign up to get started</p>
              </IonText>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-4">

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

              {/* Confirm Password */}
              <IonItem className="rounded-lg border border-input">
                <IonLabel position="stacked">Confirm Password</IonLabel>
                <div className="relative w-full">
                  <IonInput
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </IonItem>

              {/* Submit */}
              <IonButton
                expand="block"
                type="submit"
                className="bg-primary text-primary-foreground rounded-lg mt-4"
              >
                Sign Up
              </IonButton>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold">
                  Sign In
                </Link>
              </p>
            </div>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
