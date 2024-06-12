export default function Signup() {
    return <form action="/auth/signup" method="post">
        <label htmlFor="email">Email</label>
        <input name="email"
        className="text-black" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password"
        className="text-black" />
        <button>Sign Up</button>
    </form>;
}