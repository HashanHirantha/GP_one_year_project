import React, { useState, useEffect } from 'react';
import { BarChart, Calendar } from 'lucide-react';
import { supabase } from '../../config/supabase';

const AnalyticsReports = () => {
    const [activeListings, setActiveListings] = useState('...');
    const [totalInquiries, setTotalInquiries] = useState('...');
    const [reportType, setReportType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const { count: activeCount } = await supabase
                    .from('properties')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'active');
                if (activeCount !== null) setActiveListings(activeCount.toString());

                const { count: inquiryCount } = await supabase
                    .from('property_inquiries')
                    .select('*', { count: 'exact', head: true });
                if (inquiryCount !== null) setTotalInquiries(inquiryCount.toString());
            } catch (error) {
                console.error("Error fetching report data", error);
            }
        };
        fetchReportData();
    }, []);

    const convertToCSV = (objArray) => {
        if (!objArray || objArray.length === 0) return '';
        const keys = Object.keys(objArray[0]);
        const commaSeparated = [
            keys.join(','),
            ...objArray.map(obj => keys.map(k => {
                let val = obj[k] !== null && obj[k] !== undefined ? obj[k].toString() : '';
                val = val.replace(/"/g, '""');
                return `"${val}"`;
            }).join(','))
        ].join('\n');
        return commaSeparated;
    };

    const downloadCSV = (csvStr, filename) => {
        const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleGenerateReport = async () => {
        if (!reportType) return alert('Please select a Report Type.');
        if (!startDate || !endDate) return alert('Please select a Date Range.');
        if (new Date(startDate) > new Date(endDate)) return alert('Start date must be before end date.');

        setIsGenerating(true);
        try {
            // Append end of day time to include the full end date
            const endOfDay = `${endDate}T23:59:59.999Z`;
            let data = [];
            let error = null;
            let filename = '';

            if (reportType === 'User Report') {
                const res = await supabase.from('user_profiles')
                    .select('user_id, full_name, phone, created_at')
                    .gte('created_at', startDate)
                    .lte('created_at', endOfDay);
                data = res.data; error = res.error;
                filename = `Users_Report_${startDate}_to_${endDate}.csv`;
            } else if (reportType === 'Property Report') {
                const res = await supabase.from('properties')
                    .select('id, title, property_type, price, status, views, city, created_at')
                    .gte('created_at', startDate)
                    .lte('created_at', endOfDay);
                data = res.data; error = res.error;
                filename = `Properties_Report_${startDate}_to_${endDate}.csv`;
            } else if (reportType === 'Inquiries Report') {
                const res = await supabase.from('property_inquiries')
                    .select('id, property_id, buyer_id, seller_id, message, created_at')
                    .gte('created_at', startDate)
                    .lte('created_at', endOfDay);
                data = res.data; error = res.error;
                filename = `Inquiries_Report_${startDate}_to_${endDate}.csv`;
            }

            if (error) throw error;

            if (!data || data.length === 0) {
                alert('No data found for the selected date range.');
                return;
            }

            const csvString = convertToCSV(data);
            downloadCSV(csvString, filename);
            
        } catch (err) {
            console.error("Error generating report:", err);
            alert("Failed to generate report: " + err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
                <BarChart className="text-purple-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-purple-900">Analytics & Reports</h3>
            </div>

            {/* Stats Cards - Removed Revenue section per request */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active Listings</span>
                    <h3 className="text-2xl font-bold text-purple-900 mt-2">{activeListings}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Inquiries</span>
                    <h3 className="text-2xl font-bold text-purple-900 mt-2">{totalInquiries}</h3>
                </div>
            </div>

            {/* Generate Reports */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-purple-900 mb-4">Generate Reports</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Report Type</label>
                        <select 
                            value={reportType} 
                            onChange={(e) => setReportType(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-500"
                        >
                            <option value="">Select Report Type</option>
                            <option value="Inquiries Report">Inquiries Report</option>
                            <option value="User Report">User Report</option>
                            <option value="Property Report">Property Report</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Date Range</label>
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <input 
                                    type="date" 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-500" 
                                />
                            </div>
                            <div className="relative flex-1">
                                <input 
                                    type="date" 
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-500" 
                                />
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={handleGenerateReport}
                        disabled={isGenerating}
                        className="bg-secondary hover:bg-purple-600 disabled:opacity-50 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors shadow-md mt-2"
                    >
                        {isGenerating ? 'Generating...' : 'Generate and Download CSV'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsReports;
