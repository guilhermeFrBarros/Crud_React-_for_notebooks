import React, { useContext, useState, useEffect } from 'react';
import Modal from '../template/Modal';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import { LoginContext } from '../../context/LoginContext';

const Login = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [token, setToken] = useState('');
    const [msg, setMsg] = useState('');

    const [register, setRegister] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [msgErro, setMsgErro] = useState('');
    const [erro, setErro] = useState(false);

    const { isLogado, setIsLogado } = useContext(LoginContext);
    const navigate = useNavigate();

    async function userLogin() {
        //console.log(email, pass);
        const response = await fetch('http://54.207.60.35:3000/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: pass })
        });
        const data = await response.json();
        //setToken(data.token);
        //setMsg(data.msg);
        //console.log(data);

        checkFieldsLogin();

        if (response.status === 200) {
            setIsLogado(true);
            localStorage.setItem('token', data.token);
            //navigate("/home");
        } else {
            console.log("Erro");
        }

    };

    function checkFieldsLogin() {
        if(email || pass === '') {
            setErro(true);
            setMsgErro("Favor inserir um usuário válido!");
        }
    };

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            userLogin();
        }
    };

    function resetFields() {
        setEmail('');
        setPass('');
        setToken('');
        setMsg('');
        setErro(false);
        setMsgErro('');
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

        <div className="container123">
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
                                    onKeyUp={handleKeyPress}
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
                                    onKeyUp={handleKeyPress}
                                />
                            </div>
                            {erro && <p style={{color: 'red', fontSize: '1.1vw'}}>{msgErro}</p>}
                        </div>
                        <div className="button-container">
                            <div className="button-login" onClick={userLogin}>Entrar</div>
                            <div className="button-register" onClick={() => {setRegister(true); setErro(false)}}>Registre-se</div>
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
                            <div className="button-register-back" onClick={() => setRegister(false)}>Voltar</div>
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