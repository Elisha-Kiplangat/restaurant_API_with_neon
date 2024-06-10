import { userselect, userInsert, userTable } from '../drizzle/schema';
import db from '../drizzle/db';
import { sql } from 'drizzle-orm';

export const registerService = async (user: userInsert): Promise<string | null> => {
    // console.log('Inserting user:', user);
    await db.insert(userTable).values(user);
    return "User Created Successfully";
}

export const loginService = async (user: userselect) => {
    const { email, password } = user;
    return await db.query.userTable.findFirst({
        columns: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true,
            password: true
        }, where: sql `${userTable.email} = ${email}`
        
    })
}