import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Component from '../models/Component.js';
import User from '../models/User.js';

dotenv.config();

const seedTokenPrices = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Update all components with default token prices if not set
        const components = await Component.find({});
        console.log(`Found ${components.length} components`);

        for (const comp of components) {
            if (!comp.tokenPrice) {
                // Assign price based on complexity (mock logic)
                let price = 10;
                if (comp.category === 'Creative' || comp.category === 'Layout') price = 25;
                if (comp.title.includes('Animated') || comp.title.includes('Liquid')) price = 30;

                comp.tokenPrice = price;
                comp.isPremium = true;
                comp.difficulty = 'intermediate';
                await comp.save();
                console.log(`Updated ${comp.title} - Price: ${price}`);
            }
        }

        // Give all users some starter tokens
        const users = await User.find({});
        for (const user of users) {
            if (user.tokens === undefined || user.tokens === 0) {
                user.tokens = 50; // Welcome bonus
                await user.save();
                console.log(`Added welcome tokens to ${user.username}`);
            }
        }

        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedTokenPrices();
