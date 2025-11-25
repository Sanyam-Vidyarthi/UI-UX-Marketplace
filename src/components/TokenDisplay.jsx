import React from 'react';
import { Coins } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';

const TokenDisplay = () => {
    const { tokens } = useWallet();
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 hover:bg-amber-500/20 transition-all group"
        >
            <Coins size={16} className="text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-amber-100 font-medium text-sm">{tokens} Tokens</span>
        </button>
    );
};

export default TokenDisplay;
