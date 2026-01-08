
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Menu, X, Shield, Sun, Moon, LogIn, User, History, LogOut } from 'lucide-react';
import { NAV_ITEMS, MOCK_BLOG_POSTS } from './constants.tsx';
import { BlogPost, SiteSettings, ContactMessage, ScanResult } from './types.ts';

// Pages
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Services from './pages/Services.tsx';
import Product from './pages/Product.tsx';
import Blog from './pages/Blog.tsx';
import BlogDetail from './pages/BlogDetail.tsx';
import Contact from './pages/Contact.tsx';
import Docs from './pages/Docs.tsx';
import Profile from './pages/Profile.tsx';
import AdminDashboard from './pages/admin/Dashboard.tsx';
import BlogCMS from './pages/admin/BlogCMS.tsx';
import AdminSettings from './pages/admin/Settings.tsx';
import AdminMessages from './pages/admin/Messages.tsx';
import AdminLogin from './pages/admin/Login.tsx';

interface UserData {
  email: string;
}

// Context for App Data (Virtual Backend)
const AppContext = createContext<{
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => void;
  deleteMessage: (id: string) => void;
  markMessageRead: (id: string) => void;
  scans: (ScanResult & { userEmail?: string })[];
  addScan: (scan: Omit<ScanResult, 'id' | 'date'>) => void;
  isAuthenticated: boolean;
  currentUser: UserData | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}>({
  settings: { primaryColor: '#0ea5e9', theme: 'light', siteName: 'PhishDetect AI', metaDescription: '' },
  updateSettings: () => {},
  posts: [],
  addPost: () => {},
  deletePost: () => {},
  messages: [],
  addMessage: () => {},
  deleteMessage: () => {},
  markMessageRead: () => {},
  scans: [],
  addScan: () => {},
  isAuthenticated: false,
  currentUser: null,
  login: () => false,
  logout: () => {},
});

export const useApp = () => useContext(AppContext);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, isAuthenticated, currentUser, logout } = useApp();
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-[var(--primary-color)]" />
              <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary-color)] to-blue-600 bg-clip-text text-transparent">
                {settings.siteName}
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium hover:text-[var(--primary-color)] transition-colors ${
                  location.pathname === item.path ? 'text-[var(--primary-color)]' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' })}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {settings.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-6 h-6 bg-[var(--primary-color)] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    {currentUser?.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[100px]">
                    {currentUser?.email.split('@')[0]}
                  </span>
                </Link>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                <Link
                  to="/admin"
                  className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[var(--primary-color)]"
                >
                  Admin
                </Link>
                <button onClick={logout} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center space-x-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[var(--primary-color)]"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' })}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {settings.theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-card shadow-2xl absolute w-full px-4 pt-2 pb-6 flex flex-col space-y-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-[var(--primary-color)]"
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 font-bold text-[var(--primary-color)]">Profile History</Link>
              <button onClick={() => { logout(); setIsOpen(false); }} className="block px-3 py-2 text-left font-bold text-red-500">Logout</button>
            </>
          ) : (
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-bold text-[var(--primary-color)]"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

export default function App() {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('v3_settings');
    return saved ? JSON.parse(saved) : {
      primaryColor: '#0ea5e9',
      theme: 'light',
      siteName: 'PhishDetect AI',
      metaDescription: 'Secure your inbox with real-time AI phishing detection.'
    };
  });

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('v3_posts');
    return saved ? JSON.parse(saved) : MOCK_BLOG_POSTS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('v3_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [scans, setScans] = useState<(ScanResult & { userEmail?: string })[]>(() => {
    const saved = localStorage.getItem('v3_scans');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('v3_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    const saved = sessionStorage.getItem('v3_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('v3_settings', JSON.stringify(settings));
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
  }, [settings]);

  useEffect(() => localStorage.setItem('v3_posts', JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem('v3_messages', JSON.stringify(messages)), [messages]);
  useEffect(() => localStorage.setItem('v3_scans', JSON.stringify(scans)), [scans]);

  const login = (email: string, pass: string) => {
    // Demo: Any valid email + admin123
    if (email.includes('@') && pass === 'admin123') {
      const user = { email };
      setIsAuthenticated(true);
      setCurrentUser(user);
      sessionStorage.setItem('v3_auth', 'true');
      sessionStorage.setItem('v3_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem('v3_auth');
    sessionStorage.removeItem('v3_user');
  };

  const updateSettings = (newS: Partial<SiteSettings>) => setSettings(p => ({ ...p, ...newS }));
  const addPost = (p: BlogPost) => setPosts(prev => [p, ...prev]);
  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));
  
  const addMessage = (m: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => {
    const newMsg: ContactMessage = {
      ...m,
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      isRead: false
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const deleteMessage = (id: string) => setMessages(prev => prev.filter(m => m.id !== id));
  const markMessageRead = (id: string) => setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));

  const addScan = (s: Omit<ScanResult, 'id' | 'date'>) => {
    const newScan: (ScanResult & { userEmail?: string }) = {
      ...s,
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      userEmail: currentUser?.email
    };
    setScans(prev => [newScan, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      settings, updateSettings, 
      posts, addPost, deletePost, 
      messages, addMessage, deleteMessage, markMessageRead,
      scans, addScan,
      isAuthenticated, currentUser, login, logout 
    }}>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
          <Header />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/product" element={<Product />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Authenticated User Routes */}
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

              {/* Admin Protected Routes */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/blog" element={<ProtectedRoute><BlogCMS /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
              <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
            </Routes>
          </main>
          <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-slate-400 text-xs">© 2024 {settings.siteName}. Enterprise AI Cybersecurity Platform.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  );
}
