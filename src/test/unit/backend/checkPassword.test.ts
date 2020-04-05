import { checkPassword, hashNewPassword } from '../../../backend/utils/hashing';

describe('Password hashing tests', () => {
    it('Should match the hash', async () => {
        const password = 'testPassword';
        const hashedPassword = await hashNewPassword(password);
        const passwordMatches = await checkPassword(password, hashedPassword);
        expect(passwordMatches).toBe(true);
    });

    it('Should match the hash again', async () => {
        const password = 'Herpaderpa123!';
        const hashedPassword = await hashNewPassword(password);
        const passwordMatches = await checkPassword(password, hashedPassword);
        expect(passwordMatches).toBe(true);
    });

    it('Should not match the same password twice', async () => {
        const password = 'DuplicatePassword2!';
        const hashedPassword1 = await hashNewPassword(password);
        const hashedPassword2 = await hashNewPassword(password);
        const wrongHashedPassword = await hashNewPassword('WrongPassword');
        expect(hashedPassword1).not.toBe(hashedPassword2);

        const password1Matches = await checkPassword(password, hashedPassword1);
        expect(password1Matches).toBe(true);

        const password2Matches = await checkPassword(password, hashedPassword2);
        expect(password2Matches).toBe(true);

        const wrongPasswordMatches = await checkPassword(password, wrongHashedPassword);
        expect(wrongPasswordMatches).toBe(false);
    });

    it('Should not accept empty password', async () => {
        const password = '';
        await expect(hashNewPassword(password)).rejects.toThrowError('Password is empty');
    });
});
