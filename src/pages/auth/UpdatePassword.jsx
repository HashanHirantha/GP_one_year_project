import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { ShieldCheck } from 'lucide-react';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // As a safeguard, ensure the UI acknowledges the backend password recovery token
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
               console.log("Verified recovery token context natively.");
            }
        });
        return () => authListener.subscription.unsubscribe();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("New passwords do not securely match!");
            setLoading(false);
            return;
        }

        // update active authenticated user credentials gracefully
        const { error } = await supabase.auth.updateUser({ password });
        
        if (error) {
            setError("Failed to update credentials: " + error.message);
        } else {
            setSuccess("Master Password successfully overwritten! Redirecting to login terminal...");
            setTimeout(() => {
                navigate('/login', { state: { message: "Your password has been aggressively secured and reset. Please log in utilizing your new credentials." } });
            }, 3000);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary to-dark">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="bg-green-50 p-3 rounded-full mb-3 shadow-inner">
                        <ShieldCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Generate New Key</h1>
                    <p className="text-gray-500 text-sm mt-1">Please securely type your new password.</p>
                </div>
                
                <form className="space-y-4" onSubmit={handleUpdate}>
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">{error}</div>}
                    {success && <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm border border-green-200">{success}</div>}
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">New Password *</label>
                        <input
                            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="At least 8 characters"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password *</label>
                        <input
                            type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Type password carefully again"
                        />
                    </div>
                    
                    <button disabled={loading} type="submit" className="w-full bg-green-700 text-white font-bold py-3 mt-4 rounded-md hover:bg-green-800 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md">
                        {loading ? 'Encrypting Payload...' : 'Secure My Account'}
                    </button>
                    
                    <div className="pt-2 text-center">
                        <button type="button" onClick={() => navigate('/login')} className="text-sm font-bold text-gray-500 hover:text-gray-800 transition hover:underline">
                            Cancel Recovery
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
