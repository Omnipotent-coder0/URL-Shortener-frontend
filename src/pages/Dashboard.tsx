import { useState, useEffect } from 'react';
import {
    LogOut,
    Plus,
    Copy,
    Edit,
    Trash2,
    Save,
    X,
    Link,
    ExternalLink,
    Sparkles,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { logout } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { createRecord, deleteRecord, getAllRecords, updateRecord, type IRecord } from '@/api/records';
import axios from 'axios';

const Dashboard = () => {
    const [records, setRecords] = useState<IRecord[]>([]);

    const [newURL, setNewURL] = useState('');
    const [editingId, setEditingId] = useState<string>('');
    const [editingURL, setEditingURL] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleAddRecord = async () => {
        if (!newURL.trim()) return;

        if (!newURL.startsWith('http://') && !newURL.startsWith('https://')) {
            alert('Please enter a valid URL starting with http:// or https://');
            return;
        }
        try {
            const response = await createRecord({ originalURL: newURL });
            console.log({ newRecordRes: response });
            if (response.status === 201) {
                setRecords([response.data.data, ...records]);
            } else {
                alert("An unknown error occurred.");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log({ error });
                alert("Api Failed")
            } else {
                alert("An unknown error occurred.");
            }
        }
        setNewURL('');
        setIsAdding(false);
    };

    const handleEditRecord = async(id: string) => {
        const record = records.find(r => r._id === id);
        if(!record) return;
        setEditingId(id);
        setEditingURL(record.originalURL);
    };

    const handleSaveEdit = async(id:string) => {
        if (!editingURL.trim()) return;

        if (!editingURL.startsWith('http://') && !editingURL.startsWith('https://')) {
            alert('Please enter a valid URL starting with http:// or https://');
            return;
        }

        try {
            const response = await updateRecord(id, { originalURL: editingURL });;
            if (response.status === 200) {
                setRecords(records.map(record =>
                    record._id === response.data.data._id
                        ? { ...record, originalURL: editingURL }
                        : record
                ));
            } else {
                alert("An unknown error occurred.");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log({ error });
                alert("Api Failed")
            } else {
                alert("An unknown error occurred.");
            }
        }
        setEditingId('');
        setEditingURL('');
    };

    const handleDeleteRecord = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                const response = await deleteRecord(id);;
                if (response.status === 200) {
                    setRecords(records.filter(record => record._id !== response.data.data._id));
                } else {
                    alert("An unknown error occurred.");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log({ error });
                    alert("Api Failed")
                } else {
                    alert("An unknown error occurred.");
                }
            }
        }
    };

    const handleCopy = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(`${type} copied!`);
            setTimeout(() => setCopySuccess(''), 2000);
        } catch (err) {
            alert('Failed to copy to clipboard');
        }
    };

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            await logout();
            navigate("/");
            alert('Logged out successfully!');
        }
    };


    useEffect(() => {
        const getRecords = async () => {
            try {
                const response = await getAllRecords();
                if (response.status === 200) {
                    // setRecords(response.data.)
                    console.log({ data: response.data });
                    setRecords(response?.data?.data);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log({ error });
                    alert("Something went wrong !!");
                    navigate("/");
                } else {
                    alert("An unknown error occurred.");
                }
            }
        }
        getRecords();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>

                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-50 animate-ping"></div>
                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
            </div>

            {/* Mouse Follower Effect */}
            <div
                className="absolute pointer-events-none z-10"
                style={{
                    left: mousePosition.x - 200,
                    top: mousePosition.y - 200,
                    width: 400,
                    height: 400,
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease'
                }}
            ></div>

            {/* Main Content */}
            <div className="relative z-20 min-h-screen">
                {/* Header */}
                <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center space-x-3">
                                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded-lg">
                                    <Link className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                        URL Shortener
                                    </h1>
                                    <p className="text-gray-400 text-sm">Dashboard</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-red-300 hover:text-red-200"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Total Links</p>
                                    <p className="text-2xl font-bold text-white">{records.length}</p>
                                </div>
                                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-3 rounded-lg">
                                    <Link className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Active Links</p>
                                    <p className="text-2xl font-bold text-white">{records.length}</p>
                                </div>
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">Total Clicks</p>
                                    <p className="text-2xl font-bold text-white">{records.reduce((sum, record) => sum + (record.counter || 0), 0)}</p>
                                </div>
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-lg">
                                    <ExternalLink className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add New URL Section */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">Add New URL</h2>
                            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                        </div>

                        {!isAdding ? (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 text-white"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add New URL</span>
                            </button>
                        ) : (
                            <div className="flex space-x-3">
                                <input
                                    type="url"
                                    value={newURL}
                                    onChange={(e) => setNewURL(e.target.value)}
                                    placeholder="Enter URL to shorten (e.g., https://example.com)"
                                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 text-white placeholder-gray-400"
                                />
                                <button
                                    onClick={handleAddRecord}
                                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors duration-300 text-white"
                                >
                                    <Save className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        setIsAdding(false);
                                        setNewURL('');
                                    }}
                                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg transition-colors duration-300 text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Copy Success Message */}
                    {copySuccess && (
                        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>{copySuccess}</span>
                        </div>
                    )}

                    {/* Records Table */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/10">
                            <h2 className="text-xl font-semibold text-white">URL Records</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-white/5">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Original URL
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Short URL
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {records.map((record) => (
                                        <tr key={record._id} className="hover:bg-white/5 transition-colors duration-200">
                                            <td className="px-6 py-4">
                                                {editingId === record._id ? (
                                                    <input
                                                        type="url"
                                                        value={editingURL}
                                                        onChange={(e) => setEditingURL(e.target.value)}
                                                        className="w-full px-3 py-1 bg-white/10 border border-white/20 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm"
                                                    />
                                                ) : (
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-white text-sm truncate max-w-xs">
                                                            {record.originalURL}
                                                        </span>
                                                        <button
                                                            onClick={() => handleCopy(record.originalURL, 'Original URL')}
                                                            className="text-gray-400 hover:text-white transition-colors duration-200"
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-cyan-400 text-sm font-medium">
                                                        {axios.defaults.baseURL + "/" + record.shortURL}
                                                    </span>
                                                    <button
                                                        onClick={() => handleCopy(axios.defaults.baseURL + "/" + record.shortURL, 'Short URL')}
                                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 text-sm">
                                                {new Date(record.createdAt).toLocaleString("en-IN", {
                                                    timeZone: "Asia/Kolkata",
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    second: "2-digit",
                                                    hour12: false, // set to true if you want AM/PM format
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    {editingId === record._id ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleSaveEdit(record._id)}
                                                                className="text-green-400 hover:text-green-300 transition-colors duration-200"
                                                            >
                                                                <Save className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEditingId('');
                                                                    setEditingURL('');
                                                                }}
                                                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleEditRecord(record._id)}
                                                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteRecord(record._id)}
                                                                className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {records.length === 0 && (
                                <div className="text-center py-12">
                                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-400">No URL records found. Add your first URL above!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;