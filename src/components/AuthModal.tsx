import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone, LogOut, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/auth';

type Mode = 'login' | 'signup' | 'profile';

interface Props {
  open: boolean;
  onClose: () => void;
  initialMode?: Mode;
}

export function AuthModal({ open, onClose, initialMode = 'login' }: Props) {
  const { session, profile, signIn, signUp, signOut, updateProfile } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);

  useEffect(() => {
    if (open) {
      setMode(session ? 'profile' : initialMode);
    }
  }, [open, session, initialMode]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-f1-dark border border-white/10 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-[3px] bg-f1-red w-full" />
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/10 flex items-center justify-center hover:text-f1-red transition-colors z-10" aria-label="Close">
          <X size={18} />
        </button>

        <div className="p-6 md:p-8">
          {mode === 'login' && <LoginForm onSwitch={() => setMode('signup')} signIn={signIn} onClose={onClose} />}
          {mode === 'signup' && <SignUpForm onSwitch={() => setMode('login')} signUp={signUp} onClose={onClose} />}
          {mode === 'profile' && profile && (
            <ProfileForm
              profile={profile}
              email={session?.user?.email ?? ''}
              onSignOut={async () => { await signOut(); onClose(); }}
              updateProfile={updateProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function FormHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display font-black text-2xl uppercase tracking-tight">{title}</h2>
      <p className="text-sm text-f1-silver mt-1">{subtitle}</p>
    </div>
  );
}

function Field({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-f1-silver">{icon}</div>
      <input {...props} className="f1-input pl-10" />
    </div>
  );
}

function ErrorMsg({ message }: { message: string | null }) {
  if (!message) return null;
  return <p className="text-sm text-f1-red mt-3">{message}</p>;
}

function LoginForm({ onSwitch, signIn, onClose }: { onSwitch: () => void; signIn: (e: string, p: string) => Promise<{ error: string | null }>; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      onClose();
    }
  };

  return (
    <>
      <FormHeader title="Sign In" subtitle="Welcome back to F1 Ace" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field icon={<Mail size={16} />} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        <Field icon={<Lock size={16} />} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
        <ErrorMsg message={error} />
        <button type="submit" disabled={loading} className="btn-f1 w-full justify-center disabled:opacity-50">
          {loading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
        </button>
      </form>
      <p className="text-center text-sm text-f1-silver mt-5">
        Don't have an account?{' '}
        <button onClick={onSwitch} className="text-f1-red font-display font-bold hover:text-f1-red-light transition-colors">Sign up</button>
      </p>
    </>
  );
}

function SignUpForm({ onSwitch, signUp, onClose }: { onSwitch: () => void; signUp: (e: string, p: string, n: string, ph: string) => Promise<{ error: string | null }>; onClose: () => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signUp(email, password, fullName, phone);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-f1-red/10 flex items-center justify-center mx-auto mb-4">
          <Check size={28} className="text-f1-red" />
        </div>
        <h2 className="font-display font-black text-xl uppercase mb-2">Account Created</h2>
        <p className="text-sm text-f1-silver mb-5">You're all set. You can now sign in with your credentials.</p>
        <button onClick={() => { setSuccess(false); onSwitch(); }} className="btn-f1">Continue to Sign In</button>
      </div>
    );
  }

  return (
    <>
      <FormHeader title="Sign Up" subtitle="Create your F1 Ace account" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field icon={<User size={16} />} type="text" placeholder="Full name" value={fullName} onChange={e => setFullName(e.target.value)} required autoComplete="name" />
        <Field icon={<Mail size={16} />} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
        <Field icon={<Phone size={16} />} type="tel" placeholder="Phone number (optional)" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" />
        <Field icon={<Lock size={16} />} type="password" placeholder="Password (min 6 characters)" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" minLength={6} />
        <ErrorMsg message={error} />
        <button type="submit" disabled={loading} className="btn-f1 w-full justify-center disabled:opacity-50">
          {loading ? <Loader2 size={18} className="animate-spin" /> : 'Create Account'}
        </button>
      </form>
      <p className="text-center text-sm text-f1-silver mt-5">
        Already have an account?{' '}
        <button onClick={onSwitch} className="text-f1-red font-display font-bold hover:text-f1-red-light transition-colors">Sign in</button>
      </p>
    </>
  );
}

function ProfileForm({ profile, email, onSignOut, updateProfile }: {
  profile: { full_name: string | null; phone: string | null; avatar_url: string | null };
  email: string;
  onSignOut: () => void;
  updateProfile: (data: Partial<{ full_name: string; phone: string; avatar_url: string }>) => Promise<{ error: string | null }>;
}) {
  const [fullName, setFullName] = useState(profile.full_name ?? '');
  const [phone, setPhone] = useState(profile.phone ?? '');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setLoading(true);
    const { error: err } = await updateProfile({ full_name: fullName, phone });
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-f1-red flex items-center justify-center font-display font-black text-xl text-white" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
          {(fullName || email).charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-display font-black text-xl uppercase tracking-tight leading-none">{fullName || 'My Account'}</h2>
          <p className="text-xs text-f1-silver mt-1">{email}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-f1-silver mb-1.5">Full Name</label>
          <Field icon={<User size={16} />} type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-f1-silver mb-1.5">Email</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-f1-silver"><Mail size={16} /></div>
            <input value={email} disabled className="f1-input pl-10 opacity-50 cursor-not-allowed" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-f1-silver mb-1.5">Phone Number</label>
          <Field icon={<Phone size={16} />} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your phone number" />
        </div>
        <ErrorMsg message={error} />
        {saved && <p className="text-sm text-green-500 flex items-center gap-1.5"><Check size={14} /> Profile saved</p>}
        <button type="submit" disabled={loading} className="btn-f1 w-full justify-center disabled:opacity-50">
          {loading ? <Loader2 size={18} className="animate-spin" /> : 'Save Changes'}
        </button>
      </form>

      <button onClick={onSignOut} className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 text-sm font-display font-bold uppercase tracking-wider text-f1-silver border border-white/10 hover:text-f1-red hover:border-f1-red transition-colors">
        <LogOut size={16} /> Sign Out
      </button>
    </>
  );
}
