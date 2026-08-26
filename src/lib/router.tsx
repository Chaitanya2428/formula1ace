import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Route = { path: string; params: Record<string, string> };

interface RouterContextValue {
  route: Route;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  route: { path: '/', params: {} },
  navigate: () => {},
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parsePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(parsePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setRoute(parsePath(path));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

function parsePath(pathname: string): Route {
  const clean = pathname.split('?')[0];
  return { path: clean, params: {} };
}

export function useRouter() {
  return useContext(RouterContext);
}
