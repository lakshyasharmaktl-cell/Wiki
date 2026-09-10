import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Clock, RefreshCw, KeyRound, Edit3, X, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Otpsection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { verifyOtp, resendOtp, changeUnverifiedEmail } = useAuth();

  const [currentEmail, setCurrentEmail] = useState(location.state?.email || "");
  const [currentId, setCurrentId] = useState(id || location.state?.id || "");
  const initialTestOtp = location.state?.testOtp;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [currentTestOtp, setCurrentTestOtp] = useState(initialTestOtp);

  // Change Email State
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [newEmailInput, setNewEmailInput] = useState("");
  const [updatingEmail, setUpdatingEmail] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if 4th digit entered
    if (value && index === 3) {
      const fullOtp = newOtp.join("");
      if (fullOtp.length === 4) {
        submitVerification(fullOtp);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasteData.length === 4) {
      const digits = pasteData.split("");
      setOtp(digits);
      submitVerification(pasteData);
    }
  };

  const submitVerification = async (codeToSubmit = null) => {
    const finalCode = codeToSubmit || otp.join("");
    if (finalCode.length !== 4) {
      toast.warning("Please enter all 4 digits of the verification code.");
      return;
    }

    setLoading(true);
    const result = await verifyOtp(currentId, finalCode, currentEmail);
    setLoading(false);

    if (result.success) {
      setTimeout(() => {
        navigate("/user-login");
      }, 1000);
    }
  };

  const handleResend = async () => {
    if (isTimerActive) return;
    setResending(true);
    const result = await resendOtp(currentId, currentEmail);
    setResending(false);

    if (result.success) {
      setTimer(60);
      setIsTimerActive(true);
      setOtp(["", "", "", ""]);
      if (result.testOtp) setCurrentTestOtp(result.testOtp);
      inputRefs.current[0]?.focus();
    }
  };

  const handleSaveNewEmail = async (e) => {
    e.preventDefault();
    if (!newEmailInput || !newEmailInput.includes("@")) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    if (newEmailInput.toLowerCase().trim() === currentEmail.toLowerCase().trim()) {
      setIsChangingEmail(false);
      return;
    }

    setUpdatingEmail(true);
    const result = await changeUnverifiedEmail(currentId, currentEmail, newEmailInput.trim());
    setUpdatingEmail(false);

    if (result.success) {
      setCurrentEmail(result.email);
      if (result.id) setCurrentId(result.id);
      if (result.testOtp) setCurrentTestOtp(result.testOtp);
      setIsChangingEmail(false);
      setNewEmailInput("");
      setTimer(60);
      setIsTimerActive(true);
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050a15] via-[#0a1128] to-[#040814] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg mt-12"
      >
        <button
          onClick={() => navigate("/user-login")}
          className="flex items-center gap-2 text-blue-300 hover:text-amber-400 mb-6 transition-colors group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Sign In</span>
        </button>

        <div className="bg-[#0a1128]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-4 text-amber-400">
                <KeyRound className="w-8 h-8" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Verify Your Account
              </h2>

              <p className="text-gray-400 text-xs mb-3">
                Enter the 4-digit verification code sent to:
              </p>

              {/* Current Email Display with Edit Button */}
              {!isChangingEmail ? (
                <div className="flex items-center gap-2.5 bg-blue-950/70 px-4 py-2.5 rounded-2xl border border-blue-800/40">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-mono text-xs font-semibold text-amber-300 truncate max-w-[240px]">
                    {currentEmail || "your registered email"}
                  </span>
                  <button
                    onClick={() => {
                      setNewEmailInput(currentEmail);
                      setIsChangingEmail(true);
                    }}
                    type="button"
                    className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-amber-400 transition-colors ml-1"
                    title="Change email address"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* Inline Email Editor */
                <form onSubmit={handleSaveNewEmail} className="w-full bg-[#111c44] p-3 rounded-2xl border border-amber-500/40 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block text-left">
                    Update Email & Resend Code
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      value={newEmailInput}
                      onChange={(e) => setNewEmailInput(e.target.value)}
                      placeholder="Enter new email address"
                      required
                      autoFocus
                      className="w-full px-3 py-1.5 bg-[#0a1128] text-white text-xs rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      disabled={updatingEmail}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shrink-0 flex items-center gap-1 transition-all"
                    >
                      {updatingEmail ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      <span>Save</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChangingEmail(false)}
                      className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitVerification();
              }}
            >
              <div className="mb-8">
                <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
                  <AnimatePresence>
                    {otp.map((digit, index) => (
                      <motion.input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={(e) => e.target.select()}
                        className="w-14 h-16 text-center text-2xl font-bold text-white bg-[#111c44] border-2 border-white/10 rounded-2xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all"
                        disabled={loading}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-gray-400">
                    Code valid for:{" "}
                    <span className={`font-mono font-bold ${timer < 20 ? "text-red-400" : "text-amber-300"}`}>
                      {formatTime(timer)}
                    </span>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 transition-all shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Verifying...
                  </>
                ) : (
                  "Verify & Continue to Sign In"
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={handleResend}
                disabled={resending || isTimerActive}
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all inline-flex items-center gap-2 ${
                  isTimerActive || resending
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
                }`}
              >
                {resending ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Sending fresh code...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" /> Resend Code {isTimerActive ? `(${formatTime(timer)})` : ""}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>
        </div>
      </motion.div>
    </div>
  );
}
