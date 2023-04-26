import React, { useState, useEffect } from "react";
import Main from "../template/MainComp";
import axios from "axios";



//import { error } from "jquery";

const headerProps = {
    icon: "laptop",
    title: "Festas",
    subtitle: "Cadastro de Festas: Cadastrar, Listar, Alterar e Excluir"
}

const baseUrl = 'http://54.207.60.35:3000/api/parties';
const initialState = {
    party: { title: "", author: "", description: "", budget: "" },              //Isso se refere ao formulario
    list: []
}

const PartyCrud = () => {

    const [state, setState] = useState(initialState);
    const [aux, setAux] = useState();
    const [busca, setBusca] = useState('');

    useEffect(() => {
        // configurando url e o token de acesso
        //axios.defaults.baseURL = "http://54.207.60.35:3000/api/parties"; // sua URL base
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");

        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';

        axios(baseUrl).then(resp => {
            setState(prevState => ({ ...prevState, list: resp.data }));
            setAux((resp.data));
        })
            .catch(error => {
                if (error.response.status === 401) {
                    console.log("Unauthorized");
                }
                else {
                    console.error(error);
                }
            })
    }, []);

    const clear = () => {
        setState(prevState => ({ ...prevState, party: initialState.party }));
    }

    const save = () => {
        const party = state.party;                                                  // posso passar a referencia sem clonar, pois vou apenas usar e não alteraro  
        const method = party._id ? 'put' : 'post';                                    //  se _id existir faça um put, se não faça um post
        const url = party._id ? `${baseUrl}/${party._id}` : baseUrl;
        axios[method](url, party)
            .then(resp => {
                const list = getUpadateList(resp.data);
                setState(prevState => ({ ...prevState, party: initialState.party, list }))
            })
            .catch(error => {
                console.error(error);
            })
    }

    const getUpadateList = (party) => {                                                 // atualiza e retorna a lists de products
        const list = state.list.filter(p => p._id !== party.response._id)               // filter ja gera outra lista então eu não precisso clonar do state
        list.unshift(party.response);                                                  // estou removendo o produto da lista e mandando ele para  primeira posição
        return list;
    }

    const updateField = (event) => {                                            // Atualiza os campos
        const party = { ...state.party };
        party[event.target.name] = event.target.value;                        // Pegando o nome da tag para passar para state, se o input for name ="name" =  protuct[name]
        setState(prevState => ({ ...prevState, party }));                      // event.target.value;  é o do event não o que esta na tag
    }

    const search = () => {
        const lowerBusca = busca.toLowerCase();
        const list = state.list.map((i) => i);
        const item = list.filter((item) => item.title.toLowerCase().includes(lowerBusca));

        setState(prevState => ({ ...prevState, list: item}));
    };

    const limpar = () => {
        setState(prevState => ({ ...prevState, list: aux}));
        setBusca('');
    }

    const searchInput = () => {

        return (
            <div className="col-12 col-md-6 mb-3">               {/*Para dispositivos celurares o ocupe as 6 col (culunas)  se for mediao, grande ou extra grande ocupe as seis colunas*/}
                <div className="form-group">
                    <label>Busca</label>
                    < input type="text" className="form-control"
                        name="title" value={busca}     /* Em suma, quando o componente for INICIALMENTE renderizado o valor do input é = ao  state.party.name  */
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="Digite o nome para buscar..."
                    />
                </div>
                <button className="btn btn-primary mt-2"
                    onClick={search}>
                    Buscar
                </button>
                <button className="btn btn-primary mt-2 btn-danger"
                    onClick={limpar}>
                    Limpar
                </button>
            </div>
        );
    }

    const renderForm = () => {

        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6 mb-3">               {/*Para dispositivos celurares o ocupe as 6 col (culunas)  se for mediao, grande ou extra grande ocupe as seis colunas*/}
                        <div className="form-group">
                            <label >Título</label>
                            < input type="text" className="form-control"
                                name="title" value={state.party.title}     /* Em suma, quando o componente for INICIALMENTE renderizado o valor do input é = ao  state.party.name  */
                                onChange={e => updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label>Autor</label>
                            <input type="text" className="form-control"
                                name="author"
                                value={state.party.author}
                                onChange={e => updateField(e)}
                                placeholder="Digite o author..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control"
                                name="description"
                                value={state.party.description}
                                onChange={e => updateField(e)}
                                placeholder="Digite a Descrição..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                        <div className="form-group">
                            <label>Orçamento</label>
                            <input type="text" className="form-control"
                                name="budget"
                                value={state.party.budget}
                                onChange={e => updateField(e)}
                                placeholder="Digite o Orçamento..." />
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">                 {/*d-flex = display flex no bootstrat */}
                            <button className="btn btn-primary"
                                onClick={e => save(e)}>
                                Salvar
                            </button>

                            <button className="btn btn-secundary ml-2 btn-danger"
                                onClick={e => clear(e)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const load = (party) => {                        // serve para atulizar o estado da aplicação
        setState(prevState => ({ ...prevState, party }));
    }

    const remove = party => {
        axios.delete(`${baseUrl}/${party._id}`)
            .then(resp => {
                const list = state.list.filter(p => p._id !== party._id);
                setState(prevState => ({ ...prevState, list }));
            })
    }


    function renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Descrição</th>
                        <th>Orçamento</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    const renderRows = () => {
        return state.list.map((party) => {
            return (
                <tr key={party._id}>
                    <td>{party.title}</td>
                    <td>{party.author}</td>
                    <td>{party.description}</td>
                    <td>{party.budget}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => load(party)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => remove(party)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return (

        <Main {...headerProps}>
            {renderForm()}
            {searchInput()}
            {renderTable()}
        </Main>
    );
};

export default PartyCrud;









/*
import React, { useState } from "react";
import Main from "../template/MainComp";

const headerProps = {
    icon:"laptop",
    title: "Notebooks",
    subtitle: "Cadastro de Notebooks: Incluir, Listar, Alterar e Escluir"
}

const baseUrl = 'http://localhost:3001/products';
const initialState  = {
    party: { name:"", category: ""},              //Isso se refere ao formulario
    list:[]
}

const NotebookCrud = () => {
    
    const [state, setState] = useState(initialState);

    const clear = ()  => {
        setState(prevState => ({ ...prevState, product: initialState.product }));
    }

    const save = () => {
        const product = state.product;                                    // so posso fazer isso, pois não vou alterar o state, se não era recomendado clonar o product (...state.product), aqui estou pegando a referencia dele
        const method = product._id ? 'put' : 'post';
        const url = product._id ? `${baseUrl}/${product.id}` : baseUrl;
        axios[method] (url, product)                                        // axios[method] e´similar a uma anotação ponto (como axios.method), mas como é uma string tem de ser conchets[]
            .then( resp => {
                const list = getUpadateList
            } )
    }

    return (
        <Main {...headerProps}>
            Cadastro de Notebook
        </Main>
    );
};

export default NotebookCrud;

*/