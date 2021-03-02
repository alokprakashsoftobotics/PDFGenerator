import AdminModel from '../models/admin';
import bcrypt from 'bcrypt';

export default class AuthService {
    constructor() { }

    // admin pannel methods
    async adminSignUp(email, firstName, lastName, mobile, password) {
        try {
            let adminRecord = await AdminModel.getByEmail(email);
            if (adminRecord) throw new Error('Email is already registered!');

            adminRecord = await AdminModel.getByMobile(mobile); 
            if (adminRecord) throw new Error('Mobile is already registered!');

            const hashPassword = await this.hashPassword(password);

            await AdminModel.create({ mobile, email, firstName, lastName, password: hashPassword });

            return 'Successfully registered!';
            
        } catch (error) {
            console.error(`Error in adminSignUp: ${error}`);
            throw error;
        }
    }

    async adminLogin(email, password) {
        try {
            let adminRecord = await AdminModel.getByEmail(email);

            if (adminRecord && await bcrypt.compare(password, adminRecord.password)) {
                delete adminRecord.password;
                return adminRecord;
            }

            throw new Error('Invalid login!');
            
        } catch (error) {
            throw error;
        }
    }


}