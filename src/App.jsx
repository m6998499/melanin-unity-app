import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle, 
  Upload, 
  FileText, 
  Lock, 
  Cpu, 
  Download, 
  Globe, 
  Menu, 
  X, 
  ChevronRight, 
  Star,
  Activity,
  CreditCard,
  LogOut,
  Scan,
  AlertCircle
} from 'lucide-react';
// --- External Payment & Upload Links ---
// Replace these with your real payment and upload form links.

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/00w6oIb5I8T7fZJdzO9Ve01"; 
const FORM_UPLOAD_LINK = "https://YOUR_FORM_LINK_HERE";
/**
 * Melanin Unity - Black-Owned Verification SaaS
 *
 * This file contains a React SPA built with Vite and Tailwind CSS.  
 * It implements a landing page for a black-owned business verification tool,  
 * along with a multi-step wizard for uploading documents and obtaining a badge.  
 * Note: this example is based on partial code provided by the user and may require  
 * further refinements to fully implement the UI logic.  
 */

// --- Components ---

// Generic button component with variants for styling
const Button = ({ children, variant = 'primary', className = '', onClick, type = "button", disabled = false }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-emerald-500", // Green (Growth/Money)
    secondary: "bg-red-700 hover:bg-red-600 text-white border border-red-600 shadow-[0_0_15px_rgba(185,28,28,0.4)]", // Red (Power/Blood)
    outline: "bg-transparent border-2 border-neutral-700 text-neutral-300 hover:border-emerald-500 hover:text-emerald-500",
    ghost: "text-neutral-400 hover:text-white hover:bg-neutral-800",
    black: "bg-black border border-neutral-800 text-white hover:border-neutral-600"
  };

  return (
    <button type={type} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Generic card container
const Card = ({ children, className = '' }) => (
  <div className={`bg-neutral-900/80 border border-neutral-800 rounded-xl backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

// Component that previews the verification badge
const BadgePreview = ({ businessName, score, date, tier }) => {
  const isVerified = score > 70;
  
  return (
    <div className="relative group">
      <div className={`relative overflow-hidden w-full max-w-sm mx-auto bg-black border-2 ${isVerified ? 'border-emerald-500' : 'border-neutral-700'} rounded-xl p-6 shadow-2xl`}>
        {/* Decorative Pan-African Stripes */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
        <div className="absolute top-1 left-0 w-full h-1 bg-black"></div>
        <div className="absolute top-2 left-0 w-full h-1 bg-green-600"></div>

        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isVerified ? 'bg-emerald-900/30 text-emerald-500' : 'bg-neutral-800 text-neutral-500'}`}>
            <Shield className="w-8 h-8" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">
            {isVerified ? 'Black-Owned' : 'Verification Pending'}
          </h3>
          <p className="text-xs text-emerald-400 font-mono mb-4 uppercase">Self-Verified Business</p>
          
          <div className="w-full h-px bg-neutral-800 my-2"></div>
          
          <p className="text-lg font-bold text-white mb-2">{businessName || "Your Business"}</p>
          
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
            <span>ID: MU-{Math.floor(Math.random() * 10000)}</span>
            <span>•</span>
            <span>{date}</span>
          </div>

          {/* Verification Score Display */}
          <div className="w-full bg-neutral-900 rounded-full h-2 mb-2 border border-neutral-800">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${score > 80 ? 'bg-emerald-500' : score > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-neutral-500 uppercase">Verification Strength: {score}%</p>
        </div>

        {/* Branding Footer */}
        <div className="mt-6 flex justify-between items-end">
           <div className="flex flex-col">
              <span className="text-[9px] text-neutral-600">Powered by</span>
              <span className="text-[10px] font-bold text-red-500">MELANIN UNITY</span>
           </div>
           {tier === 'Pro' && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
        </div>
      </div>
      
      {/* Disclaimer Overlay (Hover) */}
      <div className="absolute -bottom-8 left-0 w-full text-center">
        <p className="text-[9px] text-neutral-500">*Self-verification based on provided documents.</p>
      </div>
    </div>
  );
};

// Landing page component
const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-900 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded text-black">
              <Shield className="w-6 h-6 fill-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter">MELANIN <span className="text-emerald-500">UNITY</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-neutral-400 hover:text-white uppercase tracking-widest">How it Works</a>
            <a href="#pricing" className="text-sm font-medium text-neutral-400 hover:text-white uppercase tracking-widest">Pricing</a>
            <button onClick={onStart} className="text-sm font-bold text-white hover:text-red-500 uppercase tracking-widest">Login</button>
            <Button onClick={onStart} variant="primary" className="py-2 px-4 text-sm">Verify Now</Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-900/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl -z-10"></div>

        <div className="text-center max-w-4xl mx-auto mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-neutral-700 rounded-full bg-neutral-900 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Automated Ownership Verification</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
            PROVE YOUR <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-yellow-500">OWNERSHIP.</span><br/>
            BUILD YOUR <span className="text-emerald-500">LEGACY.</span>
          </h1>
          
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The automated SaaS platform for Black-owned businesses to self-verify, generate proof, and display their status to the world. Secure. Fast. Trusted.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onStart} variant="primary" className="h-14 text-lg">Start Verification</Button>
            <Button onClick={onStart} variant="outline" className="h-14 text-lg">View Sample Badge</Button>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-20 bg-neutral-900 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: Scan, title: "AI Document Analysis", desc: "Our system scans LLC filings and IDs to calculate an ownership confidence score automatically." },
            { icon: Lock, title: "Secure & Encrypted", desc: "Bank-grade encryption for your documents. We don't sell your data. We verify it." },
            { icon: Globe, title: "Embed Anywhere", desc: "Get a code snippet to display your verification badge on Shopify, WordPress, or Instagram." }
          ].map((item, i) => (
            <div key={i} className="bg-black p-8 rounded-2xl border border-neutral-800 hover:border-red-900 transition-colors group">
              <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-900/20 transition-colors">
                <item.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Verification Tiers</h2>
          <p className="text-neutral-400">Choose the workflow that fits your business stage.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter */}
          <div className="bg-black border border-neutral-800 rounded-2xl p-8 flex flex-col hover:border-emerald-500/30 transition-all">
            <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-2">Starter</h3>
            <div className="text-4xl font-black text-white mb-6">$29<span className="text-lg text-neutral-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-neutral-300"><CheckCircle className="w-4 h-4 text-emerald-500" /> Basic Document Upload</li>
              <li className="flex items-center gap-3 text-neutral-300"><CheckCircle className="w-4 h-4 text-emerald-500" /> Standard Badge</li>
              <li className="flex items-center gap-3 text-neutral-300"><CheckCircle className="w-4 h-4 text-emerald-500" /> Website Embed Code</li>
            </ul>
            <Button onClick={onStart} variant="outline" className="w-full">Select Starter</Button>
          </div>

          {/* Pro */}
          <div className="bg-neutral-900 border-2 border-red-600 rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase rounded-bl-lg">Most Popular</div>
            <h3 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2">Pro Verification</h3>
            <div className="text-4xl font-black text-white mb-6">$49<span className="text-lg text-neutral-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-white"><CheckCircle className="w-4 h-4 text-red-500" /> Advanced AI Analysis</li>
              <li className="flex items-center gap-3 text-white"><CheckCircle className="w-4 h-4 text-red-500" /> Confidence Score Display</li>
              <li className="flex items-center gap-3 text-white"><CheckCircle className="w-4 h-4 text-red-500" /> Directory Ranking Boost</li>
              <li className="flex items-center gap-3 text-white"><CheckCircle className="w-4 h-4 text-red-500" /> Priority Support</li>
            </ul>
            <Button onClick={onStart} variant="secondary" className="w-full">Start Pro Workflow</Button>
          </div>

          {/* Enterprise */}
          <div className="bg-black border border-neutral-800 rounded-2xl p-8 flex flex-col hover:border-emerald-500/30 transition-all">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Enterprise</h3>
            <div className="text-4xl font-black text-white mb-6">$99<span className="text-lg text-neutral-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-neutral-300"><CheckCircle className="w-4 h-4 text-emerald-500" /> Multi-Owner LLCs</li>
              <li className="flex items-center gap-3 text-neutral-300"><CheckCircle className="w-4 h-4 text-emerald-500" /> API Access</li>
              <li className="flex items-center gap-3 text-neutral-300"><CheckCircle className="w-4 h-4 text-emerald-500" /> Custom Badge Colors</li>
            </ul>
            <Button onClick={onStart} variant="outline" className="w-full">Contact Sales</Button>
          </div>
        </div>
      </section>

      {/* Disclaimer Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-500 text-sm max-w-2xl mx-auto mb-6">
            LEGAL DISCLAIMER: Melanin Unity Software is a self-verification workflow tool. 
            Verification badges and scores are generated based solely on the documentation provided by the user. 
            We do not legally certify, endorse, or guarantee the ownership status of any entity. 
            Use of the badge indicates the business has passed our document sufficiency checks.
          </p>
          <div className="text-neutral-600 text-xs">
            © 2024 Melanin Unity SaaS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// File upload field for the wizard. Props control label, upload handler, and state.
const FileUploadField = ({ label, onUpload, isUploaded }) => (
  <div className="mb-6">
    <label className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wide">{label}</label>
    <div 
      onClick={onUpload}
      className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${isUploaded ? 'border-emerald-500 bg-emerald-900/10' : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'}`}
    >
      {isUploaded ? (
        <>
          <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
          <span className="text-emerald-500 font-medium">Document Uploaded Securely</span>
        </>
      ) : (
        <>
          <Upload className="w-8 h-8 text-neutral-500 mb-2" />
          <span className="text-neutral-400 text-sm">Click to upload or drag & drop</span>
          <span className="text-neutral-600 text-xs mt-1">PDF, JPG, PNG (Max 5MB)</span>
        </>
      )}
    </div>
  </div>
);

// Verification application wizard, showing steps for details, uploads, AI analysis, and badge display.
const VerificationApp = ({ onLogout }) => {
  const [step, setStep] = useState(1);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    ein: '',
    website: ''
  });
  
  // Simulation States
  const [uploads, setUploads] = useState({ id: false, llc: false, operating: false });
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [score, setScore] = useState(0);

  const handleUpload = (field) => {
    setUploads(prev => ({ ...prev, [field]: true }));
  };

  const startAnalysis = () => {
    setStep(3);
    setAnalyzing(true);
    
    // Simulate AI steps
    const steps = [
      "Connecting to State Registry Database...",
      "Analyzing Owner ID Match...",
      "Verifying EIN Format...",
      "Checking Operating Agreement Clauses...",
      "Generating Confidence Score..."
    ];

    let current = 0;
    const interval = setInterval(() => {
      setAnalysisStep(current);
      current++;
      if (current >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setScore(Math.floor(Math.random() * (99 - 85) + 85)); // Random high score
          setAnalyzing(false);
          setStep(4); // Go to results
        }, 1000);
      }
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-neutral-900 border-r border-neutral-800 transition-all duration-300 flex flex-col fixed h-full z-20`}>
        <div className="h-20 flex items-center px-6 border-b border-neutral-800">
           <div className="bg-red-600 p-1.5 rounded mr-3 shrink-0">
             <Shield className="w-5 h-5 text-black" />
          </div>
          {isSidebarOpen && <span className="font-bold tracking-tight">MELANIN <span className="text-emerald-500">UNITY</span></span>}
        </div>
        
        <nav className="p-4 space-y-2 flex-1">
          <div className={`px-4 py-2 text-xs font-bold text-neutral-500 uppercase tracking-widest ${!isSidebarOpen && 'hidden'}`}>Workflow</div>
          <button className="w-full flex items-center px-3 py-3 bg-neutral-800 text-white rounded-lg">
            <Activity className="w-5 h-5 mr-3 text-red-500" />
            {isSidebarOpen && <span>Verification Center</span>}
          </button>
          <button className="w-full flex items-center px-3 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-lg transition-colors">
            <FileText className="w-5 h-5 mr-3" />
            {isSidebarOpen && <span>My Documents</span>}
          </button>
          <button className="w-full flex items-center px-3 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-lg transition-colors">
            <CreditCard className="w-5 h-5 mr-3" />
            {isSidebarOpen && <span>Subscription</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button onClick={onLogout} className="w-full flex items-center px-3 py-3 text-neutral-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
        {/* Step Progress */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-neutral-800 -z-10"></div>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${step >= s ? 'bg-black border-emerald-500 text-emerald-500' : 'bg-neutral-900 border-neutral-700 text-neutral-600'}`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-neutral-500 uppercase tracking-widest">
            <span>Details</span>
            <span>Uploads</span>
            <span>AI Analysis</span>
            <span>Badge</span>
          </div>
        </div>

        {/* Dynamic Workflow Area */}
        <div className="max-w-2xl mx-auto">
          {/* STEP 1: Business Details */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black mb-2 text-white">Business Profile</h2>
              <p className="text-neutral-400 mb-8">Enter the legal details of the entity you wish to verify.</p>
              {/* Additional form fields would go here */}
              <button onClick={() => setStep(2)} className="mt-4 px-4 py-2 bg-emerald-600 rounded text-white">Next</button>
            </div>
          )}
          {/* STEP 2: Upload Documents */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black mb-2 text-white">Upload Documents</h2>
              <p className="text-neutral-400 mb-8">Upload required business documents to continue.</p>
              <FileUploadField label="Owner ID" onUpload={() => handleUpload('id')} isUploaded={uploads.id} />
              <FileUploadField label="LLC Filing" onUpload={() => handleUpload('llc')} isUploaded={uploads.llc} />
              <FileUploadField label="Operating Agreement" onUpload={() => handleUpload('operating')} isUploaded={uploads.operating} />
              <div className="flex justify-between mt-8">
                <Button onClick={() => setStep(1)} variant="outline">Back</Button>
                <Button onClick={startAnalysis} variant="primary" disabled={!(uploads.id && uploads.llc && uploads.operating)}>Start Analysis</Button>
              </div>
            </div>
          )}
          {/* STEP 3: AI Analysis */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black mb-4 text-white">AI Analysis in Progress</h2>
              <p className="text-neutral-400 mb-6">Our AI is analyzing your documents. This may take a few moments.</p>
              <div className="space-y-4">
                {analyzing && (
                  <>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 animate-pulse" style={{ width: `${(analysisStep + 1) * 20}%` }}></div>
                    </div>
                    <p className="text-neutral-500 text-sm">Please wait, analyzing...</p>
                  </>
                )}
              </div>
            </div>
          )}
          {/* STEP 4: Badge Results */}
          {step === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-black mb-4 text-white">Verification Complete</h2>
              <p className="text-neutral-400 mb-6">Here is your business badge preview. You may now embed this badge on your website.</p>
              <BadgePreview businessName={formData.businessName} score={score} date={new Date().toLocaleDateString()} tier="Pro" />
              <div className="mt-8 flex justify-between">
                <Button onClick={() => setStep(2)} variant="outline">Back</Button>
                <Button onClick={() => alert('Badge copied!')} variant="primary">Copy Badge Code</Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Root component that switches between landing page and app based on state
const App = () => {
  const [started, setStarted] = useState(false);

  return started ? (
    <VerificationApp onLogout={() => setStarted(false)} />
  ) : (
    <LandingPage onStart={() => setStarted(true)} />
  );
};

export default App;
