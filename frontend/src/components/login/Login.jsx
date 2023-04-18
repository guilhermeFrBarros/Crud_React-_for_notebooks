import React from 'react';
import { useState, useEffect } from 'react';
import './Login.css';
import Modal from '../components/Modal';

const Login = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [token, setToken] = useState('');
    const [msg, setMsg] = useState('');

    const [register, setRegister] = useState(false);
    const [openModal, setOpenModal] = useState(false);

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

        //setToken(data.token);
        //setMsg(data.msg);

        //console.log(response.status);
        
    };

    function resetFields() {
        setEmail('');
        setPass('');
        setToken('');
        setMsg('');
    };

    function teste() {
        console.log("botao");
    };
    /*
    useEffect(() => {
        console.log("useEffect");
    }, []);
    */

    return (
        <div className="container">
            <div className="form">
                {!register &&
                    <div className="login">
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
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="button-container">
                            <div className="button-login" onClick={userLogin}>Entrar</div>
                            <div className="button-register" onClick={() => setRegister(true)}>Registre-se</div>
                        </div>
                    </div>
                }
                {register &&
                    <div className="login">
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
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </div>
                            <div className="pass">
                                <p>Confirme sua senha</p>
                                <input
                                    type="password"
                                    id="pass"
                                    name="pass"
                                    placeholder="Digite sua senha..."
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="button-container-register">
                            <div className="button-register-register" onClick={() => setOpenModal(true)}>Registrar</div>
                        </div>
                    </div>
                }
            </div>
            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} text="Usuário cadastrado com sucesso!" />
            {/* o texto vai vir do backend */}
        </div>
    );
};

export default Login;