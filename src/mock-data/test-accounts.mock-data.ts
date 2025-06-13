import type { TestAccount } from "../types/auth.types";

export const TEST_ACCOUNTS: TestAccount[] = [
    {
        email: 'demo@example.com',
        password: 'password123',
        user: {
            email: 'demo@example.com',
            username: 'Demo User'
        }
    },
    {
        email: 'test@user.com',
        password: 'testpass',
        user: {
            email: 'test@user.com',
            username: 'Test User'
        }
    },
    {
        email: 'kartikjha13@gmail.com',
        password: 'Password123',
        user: {
            email: 'kartikjha13@gmail.com',
            username: 'Kartik Jha'
        }
    }
];
