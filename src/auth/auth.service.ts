import { authselect, authInsert, AuthTable, authlogin } from '../drizzle/schema';
import db from '../drizzle/db';
import { sql } from 'drizzle-orm';
import mailFunction from '../mail/register'



export const registerService = async (user: authInsert): Promise<string | null> => {
    // console.log('Inserting user:', user);
    await db.insert(AuthTable).values(user);
    await mailFunction (user.email, 'Registration Successful', user)
    return "User Created Successfully";
}

// add return types to all functions

export const loginService = async (user: authselect) => {
    const { email, password } = user;
    return await db.query.AuthTable.findFirst({
        columns: {
            email: true,
            password: true,
            role: true
        }, where: sql `${AuthTable.email} = ${email}`
        
    }) as authlogin | undefined;
}

export const updatepasswordService = async (email: string, password: string): Promise<string> => {
    await db.update(AuthTable).set({ password }).where(sql`${AuthTable.email} = ${email}`);
    
    return "Password Updated Successfully";
}

// import { sign } from 'jsonwebtoken'; // Assuming you're using jsonwebtoken for signing tokens

// export const updatePasswordService = async (email: string, password: string): Promise<string> => {
//     await db.update(AuthTable).set({ password }).where(sql`${AuthTable.email} = ${email}`);

//     return "Password Updated Successfully";
// };
