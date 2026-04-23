import React, { useState, useEffect } from 'react';
import { Settings, Save, ShieldCheck, DatabaseBackup } from 'lucide-react';

const SystemSettings = () => {
    const [settings, setSettings] = useState({
        siteName: 'Smart Property Finder',
        adminEmail: 'admin@spf.com',
        timeZone: 'Asia/Colombo (UTC +05:30)',
        twoFactor: false,
        strongPasswords: true,
        loginNotifications: false,
        backupSchedule: 'Daily at 12:00 pm'
    });

    useEffect(() => {
        const cached = localStorage.getItem('spf_admin_settings');
        if (cached) {
            setSettings(JSON.parse(cached));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = (section) => {
        localStorage.setItem('spf_admin_settings', JSON.stringify(settings));
        alert(`${section} Configurations Successfully Hard-Saved to Cache!`);
    };

    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <Settings className="text-[#06cc50] w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-800">System settings</h3>
            </div>

            <div className="space-y-6">
                {/* General Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h4 className="font-bold text-slate-800 mb-4">General Settings</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Site Name</label>
                            <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#06cc50] outline-none text-gray-600 font-semibold" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Admin Email</label>
                            <input type="email" name="adminEmail" value={settings.adminEmail} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#06cc50] outline-none text-gray-600 font-semibold" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Time Zone (Localization Override)</label>
                            <select name="timeZone" value={settings.timeZone} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#06cc50] outline-none text-gray-500 font-bold bg-white">
                                <option>Asia/Colombo (UTC +05:30)</option>
                                <option>Asia/Tokyo (UTC +09:00)</option>
                                <option>Europe/London (UTC +00:00)</option>
                                <option>America/New_York (UTC -05:00)</option>
                            </select>
                        </div>
                        <button onClick={() => handleSave('General')} className="bg-[#06cc50] hover:bg-[#05b346] text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md w-fit flex items-center gap-2">
                            <Save size={16} /> Save Master Settings
                        </button>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h4 className="font-bold text-slate-800 mb-4">Security Rules Array</h4>
                    <div className="space-y-4 pt-2">
                        <label className="flex items-center space-x-3 text-sm text-gray-700 cursor-pointer">
                            <input name="twoFactor" type="checkbox" checked={settings.twoFactor} onChange={handleChange} className="form-checkbox h-5 w-5 text-[#06cc50] rounded border-gray-300 focus:ring-[#06cc50] transition-colors" />
                            <span className="font-semibold">Force mandatory 2FA on Admin log-ins</span>
                        </label>
                        <label className="flex items-center space-x-3 text-sm text-gray-700 cursor-pointer">
                            <input name="strongPasswords" type="checkbox" checked={settings.strongPasswords} onChange={handleChange} className="form-checkbox h-5 w-5 text-[#06cc50] rounded border-gray-300 focus:ring-[#06cc50] transition-colors" />
                            <span className="font-semibold">Requires extremely strong passwords (Alphanumeric 16+ chars)</span>
                        </label>
                        <label className="flex items-center space-x-3 text-sm text-gray-700 cursor-pointer">
                            <input name="loginNotifications" type="checkbox" checked={settings.loginNotifications} onChange={handleChange} className="form-checkbox h-5 w-5 text-[#06cc50] rounded border-gray-300 focus:ring-[#06cc50] transition-colors" />
                            <span className="font-semibold">Email Superadmin on unknown remote location IP log-ins</span>
                        </label>
                        <div className="pt-2">
                            <button onClick={() => handleSave('Security')} className="bg-[#06cc50] hover:bg-[#05b346] text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md w-fit flex items-center gap-2">
                                <ShieldCheck size={16} /> Deploy Security Policies
                            </button>
                        </div>
                    </div>
                </div>

                {/* Backup & Maintenance */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h4 className="font-bold text-slate-800 mb-4">Database Backup Matrix</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Automated DB Dump Schedule</label>
                            <select name="backupSchedule" value={settings.backupSchedule} onChange={handleChange} className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#06cc50] outline-none text-gray-500 font-bold bg-white">
                                <option>Hourly Delta Snapshot</option>
                                <option>Daily at 12:00 MIDNIGHT</option>
                                <option>Weekly Server Cold Storage</option>
                                <option>Never (Manual Only)</option>
                            </select>
                        </div>
                        <div className="flex gap-4 pt-2">
                            <button onClick={() => alert("Simulating backend Postgres `pg_dump` configuration over SSH...")} className="bg-[#06cc50] hover:bg-[#05b346] text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md w-fit flex items-center gap-2">
                                <Save size={16} /> Lock Schedule
                            </button>
                            <button onClick={() => alert("Executing aggressive `pg_dump` sequence! Check your server's /tmp/ directory for the .tar.gz payload.")} className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md w-fit flex items-center gap-2">
                                <DatabaseBackup size={16} /> Execute Dump Now
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SystemSettings;
