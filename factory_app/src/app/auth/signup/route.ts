import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const cookieStore = cookies();

    const formData = await req.formData();
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore
    });

    try {
    
        await supabase
        .auth
        .signUp({
            email, password,
            options: {
                emailRedirectTo: '$(url.origin)/auth/callback'
            }
        });

    return NextResponse.redirect(url.origin, {
       status: 301 
    });
    } catch (error) {
        console.error(error);
    }
}