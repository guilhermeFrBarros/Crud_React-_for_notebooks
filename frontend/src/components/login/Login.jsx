import React from 'react';
import { useState, useEffect } from 'react';
import './Login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [token, setToken] = useState('');
    const [msg, setMsg] = useState('');

    const handleSetEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSetPass = (e) => {
        setPass(e.target.value);
    };

    async function userLogin() {
        console.log(email, pass);
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: pass })
        });
        const data = await response.json();

        setToken(data.token);
        setMsg(data.msg);
    };

    function resetFields() {
        setEmail('');
        setPass('');
        setToken('');
        setMsg('');
    };

    useEffect(() => {
        console.log("useEffect");
    }, []);

    return (
        <div className="container">
            <div className="form">
                <div className="header">
                    <p>Login</p>
                </div>
                <div className="inputs">
                    <div className="email">
                        <p>E-mail</p>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu email..."
                            value={email}
                            onChange={handleSetEmail}
                        />
                    </div>
                    <div className="pass">
                        <p>Senha</p>
                        <input
                            type="password"
                            id="pass"
                            name="pass"
                            placeholder="Digite sua senha..."
                            value={pass}
                            onChange={handleSetPass}
                        />
                    </div>
                </div>
                <div className="button" onClick={userLogin}>Entrar</div>
            </div>
        </div>
    );
};

export default Login;