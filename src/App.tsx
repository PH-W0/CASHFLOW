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

/* Pages */
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { AddTransaction } from './pages/AddTransaction';
import NotFound from "./pages/NotFound";


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
      <TransactionProvider>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/" render={() => <Redirect to="/welcome" />} />

              <Route exact path="/welcome">
                <PageWrapper>
                  <Welcome />
                </PageWrapper>
              </Route>
              <Route exact path="/login">
                <PageWrapper>
                  <Login />
                </PageWrapper>
              </Route>
              <Route exact path="/signup">
                <PageWrapper>
                  <Signup />
                </PageWrapper>
              </Route>
              <Route exact path="/dashboard">
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              </Route>
              <Route exact path="/add-transaction">
                <PageWrapper>
                  <AddTransaction />
                </PageWrapper>
              </Route>
              
              

              {/* Catch-all route */}
              <Route path="*">
                <PageWrapper>
                  <NotFound />
                </PageWrapper>
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </TransactionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
