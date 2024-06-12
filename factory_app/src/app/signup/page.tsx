'use client';

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Login() {
    const [data, setData] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    })

    const [notification, setNotification] = useState<string | null>(null);

    const router = useRouter();

    const login = async () => {
        try {                   
            let { data: dataUser, error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password
              })

            if (dataUser) {
                setNotification("A confirmation email has been sent, please validate your Email");
            } //redirect une fois connecté faire log in et faire une signup road pcq pr l'instant c en signup mais ca doit aller en log in une fois sign up sur auth supabase

        } catch(error) {
            console.log(error);
        }
    }

    const handleChange = (e: any) => {
        const {name, value } = e.target;
        setData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    return <div className="container mx-auto w-[400px] grid gap-4">
        <div className='grid'>
            <label>Email</label>
            <input
            type='text'
            name='email'
            value={data?.email}
            onChange={handleChange}
            className="text-black"
            />
        </div>
        <div className="container mx-auto w-[400px]">
            <label>Password</label>
            <input
            type='password'
            name='password'
            value={data?.password}
            onChange={handleChange}
            className="text-black"
            />
        </div>
        <div>
            <button className="px-4 py-2 bg-blue-500 rounded cursor-pointer" onClick={login}
                >Sign up</button>
        </div>
        {notification && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '20px',
            backgroundColor: '#444',
            color: '#fff',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'
          }}>
            {notification}
          </div>
        )}
    </div>;
}