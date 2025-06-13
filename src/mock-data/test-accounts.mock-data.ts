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
    }
];
