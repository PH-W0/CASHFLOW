import './global.css';
import './theme/variables.css';

/* Ionic core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

/* Ionic + Router */
import { setupIonicReact, IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

/* Libraries */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Context / UI */
import { TransactionProvider } from './context/TransactionContext';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from './components/ui/sonner';
import { Layout } from './components/Layout';
import { AuthProvider } from './hooks/useAuth';

/* Pages */
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { AddTransaction } from './pages/AddTransaction';
import NotFound from './pages/NotFound';
import TimersScreen from './pages/TimersScreen';
import TransactionDetail from './pages/TransactionDetail';

setupIonicReact();

const queryClient = new QueryClient();

/* Wrapper to avoid repeating Layout on every page */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout>{children}</Layout>
);

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <TransactionProvider>
          <IonApp>
            <IonReactRouter>
              <IonRouterOutlet>

                {/* Redirect root */}
                <Route exact path="/" render={() => <Redirect to="/welcome" />} />

                {/* Public pages */}
                <Route exact path="/welcome" render={() => <PageWrapper><Welcome /></PageWrapper>} />
                <Route exact path="/login" render={() => <PageWrapper><Login /></PageWrapper>} />
                <Route exact path="/signup" render={() => <PageWrapper><Signup /></PageWrapper>} />

                {/* Dashboard & Transactions */}
                <Route exact path="/dashboard" render={() => <PageWrapper><Dashboard /></PageWrapper>} />
                <Route exact path="/add-transaction" render={() => <PageWrapper><AddTransaction /></PageWrapper>} />
                <Route exact path="/timers" render={() => <PageWrapper><TimersScreen /></PageWrapper>} />
                <Route exact path="/transaction/:id" render={() => <PageWrapper><TransactionDetail /></PageWrapper>} />

                {/* Catch-all */}
                <Route path="*" render={() => <PageWrapper><NotFound /></PageWrapper>} />

              </IonRouterOutlet>
            </IonReactRouter>
          </IonApp>
        </TransactionProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
