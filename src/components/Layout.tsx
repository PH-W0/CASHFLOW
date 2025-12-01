import { Link, useLocation } from "react-router-dom";
import { Plus, Home } from "lucide-react";


export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Define bottom nav items (Dashboard removed)
  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    
  ];

  // Hide nav on Welcome/Login/Signup
  const isNavVisible =
    !["/", "/welcome", "/login", "/signup"].includes(location.pathname);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-20">{children}</div>

      {/* Bottom navigation for other pages */}
      {isNavVisible && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border flex items-center justify-around h-20">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                location.pathname === path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
