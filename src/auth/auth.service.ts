import { authselect, authInsert, AuthTable } from '../drizzle/schema';
import db from '../drizzle/db';
import { sql } from 'drizzle-orm';

export const registerService = async (user: authInsert): Promise<string | null> => {
    // console.log('Inserting user:', user);
    await db.insert(AuthTable).values(user);
    return "User Created Successfully";
}

export const loginService = async (user: authselect) => {
    const { email, password } = user;
    return await db.query.AuthTable.findFirst({
        columns: {
            email: true,
            password: true,
            role: true
        }, where: sql `${AuthTable.email} = ${email}`
        
    })
}
