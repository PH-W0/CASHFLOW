import { IonPage, IonContent } from "@ionic/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Welcome() {
  return (
    <IonPage>
      <IonContent fullscreen className="bg-background">
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm text-center">
            {/* Logo */}
            <div className="mb-8">
              <div className="text-4xl font-bold text-primary mb-2">
                CASHFLW
              </div>
              <p className="text-muted-foreground">
                Manage your finances with ease
              </p>
            </div>

            {/* Illustration */}
            <div className="bg-primary/10 rounded-3xl p-12 mb-8 border border-primary/20 flex items-center justify-center min-h-40">
              <div className="text-center">
                <div className="text-6xl mb-2">💰</div>
                <p className="text-sm text-muted-foreground">
                  Track income, expenses & more
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="text-left space-y-4 mb-8">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Track Income
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Record all your income sources
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-error/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-error" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Track Expenses
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Monitor and categorize spending
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    View Net Income
                  </p>
                  <p className="text-xs text-muted-foreground">
                    See your actual balance in real time
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link
                to="/signup"
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Sign Up
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="w-full border border-primary text-primary font-semibold py-3 rounded-lg hover:bg-primary/5 transition-colors"
              >
                Sign In
              </Link>
            </div>

            {/* Footer */}
            <p className="text-xs text-muted-foreground mt-8">
              Experience the easiest way to managing your finances
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
