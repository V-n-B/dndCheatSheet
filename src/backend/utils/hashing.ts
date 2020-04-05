import argon2 from 'argon2';

// Larger numbers mean better security, smaller numbers mean better performance
const config = {
    // Size of the generated hash
    hashBytes: 32,
    // More iterations means an attacker has to take longer to brute force an
    // individual password, so larger is better. however, larger also means longer
    // to hash the password. tune so that hashing the password takes about a
    // second
    iterations: 50,
    // The more memory usage, the more difficult it is to crack using parallel GPUs
    memoryUsage: 50,
    // Same goes for threads
    threads: 1,
    // larger salt means hashed passwords are more resistant to rainbow table, but
    // you get diminishing returns pretty fast
    saltBytes: 16,
    digest: 'sha512',
};

export async function hashNewpassword(password: string): Promise<string> {
    if (!password) {
        throw new Error('Password is empty');
    }

    try {
        return await argon2.hash(password, {
            type: argon2.argon2id,
            saltLength: config.saltBytes,
            hashLength: config.hashBytes,
            memoryCost: config.memoryUsage,
            timeCost: config.iterations,
            parallelism: 1,
        });
    } catch (e) {
        throw new Error(`Hashing failed: ${e}`);
    }
}

export async function checkPassword(password: string, hashedPassword: string) {
    try {
        return await argon2.verify(hashedPassword, password);
    } catch (e) {
        throw new Error(`Verifying password failed: ${e}`);
    }
}
