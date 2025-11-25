import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coins, AlertCircle, Check } from 'lucide-react';
import Button from './Button';

const PurchaseModal = ({ isOpen, onClose, component, onConfirm, loading, userTokens }) => {
    if (!isOpen || !component) return null;

    const canAfford = userTokens >= component.tokenPrice;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Confirm Purchase</h3>
                            <p className="text-zinc-400 text-sm">Unlock this component for your projects</p>
                        </div>
                        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden">
                                {component.previewImage ? (
                                    <img src={component.previewImage} alt={component.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-2xl">🎨</div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">{component.title}</h4>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                                        {component.category}
                                    </span>
                                    <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                                        Premium
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Component Price</span>
                                <span className="text-white font-medium flex items-center gap-1">
                                    {component.tokenPrice} <Coins size={14} className="text-amber-400" />
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Your Balance</span>
                                <span className="text-white font-medium flex items-center gap-1">
                                    {userTokens} <Coins size={14} className="text-amber-400" />
                                </span>
                            </div>
                            <div className="h-px bg-white/10 my-2" />
                            <div className="flex justify-between text-sm font-semibold">
                                <span className={canAfford ? "text-green-400" : "text-red-400"}>
                                    {canAfford ? "Remaining Balance" : "Insufficient Tokens"}
                                </span>
                                <span className={canAfford ? "text-green-400" : "text-red-400"}>
                                    {userTokens - component.tokenPrice} <Coins size={14} className="inline" />
                                </span>
                            </div>
                        </div>

                        {!canAfford && (
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                <p>You don't have enough tokens. Please purchase a token package to continue.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/5 flex gap-3">
                        <Button variant="ghost" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        {canAfford ? (
                            <Button
                                variant="primary"
                                onClick={onConfirm}
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500"
                            >
                                {loading ? 'Processing...' : `Pay ${component.tokenPrice} Tokens`}
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                onClick={() => window.location.href = '/pricing'}
                                className="flex-1"
                            >
                                Get Tokens
                            </Button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PurchaseModal;
