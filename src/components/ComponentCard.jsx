import React, { useState } from 'react';
import Button from './Button';
import ComponentPreview from './ComponentPreview';
import { ArrowRight, Code2, Eye, Coins, Lock, Download, Heart, Check } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useAuth } from '../context/AuthContext';
import PurchaseModal from './PurchaseModal';
import { useNavigate } from 'react-router-dom';

const ComponentCard = ({ component, onClick, viewMode = 'grid' }) => {
    const { isOwned, isWishlisted, toggleWishlist, purchaseComponent, tokens, loading } = useWallet();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    const owned = isOwned(component.id || component._id);
    const wishlisted = isWishlisted(component.id || component._id);

    const handleMouseMove = (e) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleAction = (e) => {
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }
        if (owned) {
            onClick(component); // Open details/code
        } else {
            setShowPurchaseModal(true);
        }
    };

    const handleWishlist = async (e) => {
        e.stopPropagation();
        if (!user) return;
        setWishlistLoading(true);
        await toggleWishlist(component.id || component._id);
        setWishlistLoading(false);
    };

    const handleConfirmPurchase = async () => {
        const result = await purchaseComponent(component.id || component._id);
        if (result.success) {
            setShowPurchaseModal(false);
        } else {
            alert(result.message);
        }
    };

    if (viewMode === 'list') {
        return (
            <>
                <div
                    className="glass-panel group spotlight-card flex flex-col md:flex-row overflow-hidden rounded-2xl border border-white/5 hover:border-violet-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 bg-[#0a0a0a]/60"
                    onMouseMove={handleMouseMove}
                    onClick={() => onClick(component)}
                >
                    <div className="w-full md:w-64 h-48 md:h-auto relative bg-gradient-to-br from-white/5 to-black/50 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                        <div className="absolute inset-0 bg-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="transform group-hover:scale-105 transition-transform duration-500">
                            <ComponentPreview component={component} />
                        </div>
                    </div>
                    <div className="p-6 flex flex-col justify-center flex-1">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-violet-300">
                                        {component.category}
                                    </div>
                                    {owned && (
                                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
                                            <Check size={10} /> Owned
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">{component.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                    {component.description}
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                                <button
                                    onClick={handleWishlist}
                                    className={`p-2 rounded-full transition-colors ${wishlisted ? 'text-red-500 bg-red-500/10' : 'text-zinc-500 hover:text-white hover:bg-white/10'}`}
                                >
                                    <Heart size={20} className={wishlisted ? "fill-current" : ""} />
                                </button>
                                <Button
                                    variant={owned ? "secondary" : "primary"}
                                    className="!py-2 !px-4 rounded-full flex items-center gap-2"
                                    onClick={handleAction}
                                >
                                    {owned ? (
                                        <>Download <Download size={16} /></>
                                    ) : (
                                        <>{component.tokenPrice || 10} <Coins size={16} /></>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <PurchaseModal
                    isOpen={showPurchaseModal}
                    onClose={() => setShowPurchaseModal(false)}
                    component={component}
                    onConfirm={handleConfirmPurchase}
                    loading={loading}
                    userTokens={tokens}
                />
            </>
        );
    }

    return (
        <>
            <div
                className="glass-panel group spotlight-card h-full flex flex-col rounded-3xl overflow-hidden border border-white/5 hover:border-violet-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 bg-[#0a0a0a]/60 hover:-translate-y-1 cursor-pointer"
                onMouseMove={handleMouseMove}
                onClick={() => onClick(component)}
            >
                {/* Preview Area */}
                <div className="h-64 relative bg-gradient-to-br from-white/5 to-black/50 flex items-center justify-center overflow-hidden border-b border-white/5 group-hover:border-white/10 transition-colors">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="transform group-hover:scale-110 transition-transform duration-700 ease-out w-full flex justify-center relative z-10">
                        <ComponentPreview component={component} />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-20">
                        <button
                            onClick={(e) => { e.stopPropagation(); onClick(component); }}
                            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md border border-white/10"
                        >
                            <Eye size={20} />
                        </button>
                        <button
                            onClick={handleAction}
                            className={`p-3 rounded-full text-white hover:scale-110 transition-all shadow-lg ${owned ? 'bg-green-600 hover:bg-green-500 shadow-green-500/30' : 'bg-violet-600 hover:bg-violet-500 shadow-violet-500/30'}`}
                        >
                            {owned ? <Download size={20} /> : <Coins size={20} />}
                        </button>
                    </div>

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlist}
                        className={`absolute top-4 right-4 z-30 p-2 rounded-full backdrop-blur-md transition-all ${wishlisted
                                ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                                : 'bg-black/30 text-white/50 hover:text-white border border-white/10 hover:bg-black/50'
                            }`}
                    >
                        <Heart size={18} className={wishlisted ? "fill-current" : ""} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="mb-auto">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold tracking-wider text-violet-400 uppercase">
                                {component.category}
                            </span>
                            {owned && (
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                                    <Check size={10} /> Owned
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors">{component.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
                            {component.description}
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-amber-400 font-bold">
                            <Coins size={16} />
                            <span>{component.tokenPrice || 10}</span>
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1 text-violet-400 text-xs font-medium opacity-0 group-hover:opacity-100">
                            View Details <ArrowRight size={12} />
                        </span>
                    </div>
                </div>
            </div>
            <PurchaseModal
                isOpen={showPurchaseModal}
                onClose={() => setShowPurchaseModal(false)}
                component={component}
                onConfirm={handleConfirmPurchase}
                loading={loading}
                userTokens={tokens}
            />
        </>
    );
};

export default ComponentCard;
