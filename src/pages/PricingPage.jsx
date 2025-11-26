import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, Zap, Shield, Star, Coins, Sparkles } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import Button from '../components/Button';
import { motion } from 'motion/react';

const PricingPage = () => {
    const { purchaseTokens, loading } = useWallet();
    const [hoveredCard, setHoveredCard] = useState(null);

    const packages = [
        {
            id: 'starter',
            name: 'Starter',
            price: 10,
            tokens: 50,
            features: ['Access to basic components', 'Community support', 'Lifetime updates'],
            color: 'from-blue-500 to-cyan-500',
            popular: false
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 25,
            tokens: 150,
            bonus: 25,
            features: ['Access to all components', 'Priority support', 'Early access to new items', 'Commercial license'],
            color: 'from-violet-600 to-fuchsia-600',
            popular: true
        },
        {
            id: 'ultimate',
            name: 'Ultimate',
            price: 50,
            tokens: 350,
            bonus: 100,
            features: ['Everything in Pro', 'Custom component requests', '1-on-1 implementation help', 'Extended license'],
            color: 'from-amber-500 to-orange-600',
            popular: false
        }
    ];

    const handlePurchase = async (pkg) => {
        const result = await purchaseTokens(pkg.tokens + (pkg.bonus || 0));
        if (result.success) {
            alert(`Successfully purchased ${pkg.tokens} tokens!`);
        } else {
            alert('Purchase failed: ' + result.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#030303] flex flex-col relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-900/20 rounded-full blur-[120px] animate-blob" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-900/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-cyan-900/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
            </div>

            <Navbar />

            <div className="flex-1 pt-32 pb-20 px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                                Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white animate-text-shimmer">Transparent</span> Pricing
                            </h1>
                            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                                Purchase tokens to unlock premium components. Pay once, use forever. No subscriptions, no hidden fees.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {packages.map((pkg, index) => (
                            <PricingCard
                                key={pkg.id}
                                pkg={pkg}
                                index={index}
                                onPurchase={handlePurchase}
                                loading={loading}
                            />
                        ))}
                    </div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <FeatureCard
                            icon={<Zap className="text-amber-400" size={24} />}
                            title="Instant Access"
                            description="Get immediate access to code and assets after purchase. No waiting time."
                            color="bg-amber-500/10"
                        />
                        <FeatureCard
                            icon={<Shield className="text-violet-400" size={24} />}
                            title="Secure Payments"
                            description="All transactions are encrypted and secure. We never store your card details."
                            color="bg-violet-500/10"
                        />
                        <FeatureCard
                            icon={<Star className="text-pink-400" size={24} />}
                            title="Lifetime Updates"
                            description="Purchase once and get all future updates for free. Forever."
                            color="bg-pink-500/10"
                        />
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const PricingCard = ({ pkg, index, onPurchase, loading }) => {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            className={`relative group rounded-3xl p-[1px] overflow-hidden ${pkg.popular ? 'scale-105 z-10' : 'scale-100 z-0'}`}
            style={{
                background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 40%)`
            }}
        >
            {/* Border Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-b ${pkg.popular ? 'from-violet-500/50 to-fuchsia-500/50' : 'from-white/10 to-transparent'} opacity-50`} />

            <div className="relative h-full bg-[#0a0a0a] rounded-3xl p-8 flex flex-col backdrop-blur-xl">
                {pkg.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold px-4 py-1 rounded-b-xl shadow-lg shadow-violet-900/20">
                        MOST POPULAR
                    </div>
                )}

                <div className="mb-8 mt-4">
                    <h3 className="text-xl font-medium text-zinc-300 mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold text-white tracking-tighter">${pkg.price}</span>
                        <span className="text-zinc-500">/ one-time</span>
                    </div>
                    <div className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${pkg.color} bg-opacity-10 border border-white/5`}>
                        <Coins size={18} className="text-white" />
                        <span className="font-bold text-white">{pkg.tokens} Tokens</span>
                        {pkg.bonus && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md text-white font-medium">+{pkg.bonus} Bonus</span>}
                    </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                    {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-400 group-hover:text-zinc-300 transition-colors">
                            <div className={`mt-1 p-0.5 rounded-full ${pkg.popular ? 'bg-violet-500/20 text-violet-400' : 'bg-zinc-800 text-zinc-500'}`}>
                                <Check size={14} />
                            </div>
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>

                <Button
                    variant={pkg.popular ? 'primary' : 'secondary'}
                    className={`w-full justify-center py-4 text-base ${pkg.popular ? 'shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40' : ''}`}
                    onClick={() => onPurchase(pkg)}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Get Started'}
                </Button>
            </div>
        </motion.div>
    );
};

const FeatureCard = ({ icon, title, description, color }) => (
    <div className="group p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 transition-all duration-300 hover:-translate-y-2">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-zinc-400 leading-relaxed">{description}</p>
    </div>
);

export default PricingPage;
