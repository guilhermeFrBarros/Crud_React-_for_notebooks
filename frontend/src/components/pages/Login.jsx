import React, { useContext, useState, useEffect } from 'react';
import Modal from '../template/Modal';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import { LoginContext } from '../../context/LoginContext';

const URL = 'https://localhost:3001';

const Login = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [register, setRegister] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [msgErro, setMsgErro] = useState('');
    const [erro, setErro] = useState(false);
    const [feeback, setFeedBack] = useState(false);
    const [msgFeedBack, setMsgFeedBack] = useState('');

    const { isLogado, setIsLogado } = useContext(LoginContext);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    console.log('teste');

    async function userLogin() {
        //console.log(email, pass);
        const response = await fetch(`${URL}/session`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: pass })
        });
        const data = await response.json();

        checkFieldsLogin();

        if (response.status === 200) {
            setIsLogado(true);
            localStorage.setItem('token', data.token);
            resetFields();
            navigate("/home");
        } else {
            console.log("ERRO: " + response.status + " " + response.statusText);
            setErro(true);
            setMsgErro("Favor inserir um usuário válido!");
        }

    };

    function checkFieldsLogin() {
        if (email === '' || pass === '') {
            setErro(true);
            setMsgErro("Favor inserir um usuário válido!");
        }
    };

    async function checkFieldsRegister() {
        if (email === '' || pass === '' || confirmPass === '') {
            setErro(true);
            setMsgErro("Favor preencher os campos corretamente!");
            return;
        }
        setErro(false);
        const retorno = await createUser();
        setFeedBack(true);
        setMsgFeedBack(retorno);

    };

    async function createUser() {
        const response = await fetch(`${URL}/users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: pass, confirmPassword: confirmPass })
        })
        const data = await response.json();
        
        if(response.status === 422) {
            if(data.msg) {
                setErro(true);
                setMsgErro(data.msg);
                return;
            } else {
                setErro(true);
                setMsgErro(data.msg);
                resetFields();
                return;
            }
        }
        return data.msg;
    };

    function handleKeyPress(e) {
        if (e.key === "Enter" && !register) {
            userLogin();
        } else if (e.key === "Enter" && register) {
            checkFieldsRegister();
        }
    };

    function resetFields() {
        setEmail('');
        setPass('');
        setErro(false);
        setMsgErro('');
        setConfirmPass('');
        setFeedBack(false);
        setMsgFeedBack('');
    };

    /*
    useEffect(() => {
        
    }, []);
    */

    return (
        <div>
            {!token &&
                <div className="container123">
                    <div className="form1">
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
                                    {erro && <p style={{ color: 'red', fontSize: '1.1vw' }}>{msgErro}</p>}
                                </div>
                                <div className="button-container">
                                    <div className="button-login" onClick={userLogin}>Entrar</div>
                                    <div className="button-register" onClick={() => { setRegister(true); setErro(false); resetFields(); }}>Registre-se</div>
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
                                    <div className="pass">
                                        <p>Confirme sua senha</p>
                                        <input
                                            type="password"
                                            id="pass"
                                            name="pass"
                                            placeholder="Digite sua senha..."
                                            value={confirmPass}
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                            onKeyUp={handleKeyPress}
                                        />
                                    </div>
                                    {erro && <p style={{ color: 'red', fontSize: '1.1vw' }}>{msgErro}</p>}
                                    {feeback && <p style={{ color: 'green', fontSize: '1.1vw' }}>{msgFeedBack}</p>}
                                </div>
                                <div className="button-container-register">
                                    {/* <div className="button-register-register" onClick={() => setOpenModal(true)}>Registrar</div> */}
                                    <div className="button-register-register" onClick={checkFieldsRegister}>Registrar</div>
                                    <div className="button-register-back" onClick={() => { setRegister(false); resetFields(); }}>Voltar</div>
                                </div>
                            </div>
                        }
                    </div>
                    {/* <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} text="Usuário cadastrado com sucesso!" /> */}
                    {/* o texto vai vir do backend */}
                </div>
            }
        </div>

    );
};

export default Login;