import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const login = await axios.post("/api/auth/Login", {
        username,
        password,
      });

      if (login.status == 200) {
        const token = login.data.token
        localStorage.setItem("token", token)
        router.push('/')
      }
    } catch (error) {
      window.alert('Login Failed')
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex justify-between">
      <div className="w-1/3 bg-primary-color text-white flex flex-col justify-center">
        <div className="w-full px-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-wider">Login Page</h1>
            <p className="mt-2 opacity-70">Please input correct data</p>
          </div>
          <form onSubmit={handleLogin} className="w-full mt-8">
            <input
              placeholder="Username"
              className={`w-full px-4 py-4 bg-primary-color border outline-none ${
                isError ? "border-red-500" : "border-slate-500"
              }`}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            />
            <input
              placeholder="Password"
              className={`w-full px-4 py-4 bg-primary-color border border-slate-500 outline-none my-4`}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
            />
            <button className="py-4 w-full border border-slate-500 text-slate-300 hover:text-white">
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="w-2/3 bg-white flex items-center justify-center">
        <Image src={"/6607.jpg"} alt="image..." width={900} height={800} />
      </div>
    </div>
  );
};

export default Login;
