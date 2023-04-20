import React, { useState, useEffect } from "react";
import Main from "../template/MainComp";
import axios from "axios";

const headerProps = {
    icon:"laptop",
    title: "Notebooks",
    subtitle: "Cadastro de Notebooks: Incluir, Listar, Alterar e Escluir"
}

const baseUrl = 'http://localhost:3001/products';
const initialState  = {
    product: { name:"", category: ""},              //Isso se refere ao formulario
    list:[]
}

const NotebookCrud = () => {
    
    const [state, setState] = useState(initialState);

    useEffect(  () => {
        axios(baseUrl).then(resp => {
            setState( prevState => ({...prevState, list:resp.data }) )
        });
    }, []);
    
    const clear = () => {
        setState( prevState => ({...prevState, product: initialState.product }));
    }

    const save = () => {
        const product = state.product;                                                  // posso passar a referencia sem clonar, pois vou apenas usar e não alteraro  
        const method = product.id ? 'put' : 'post';                                    //  se id existir faça um put, se não faça um post
        const url =  product.id ? `${baseUrl}/${product.id}` : baseUrl;
        axios[method](url, product)
            .then(resp => {
                const list = getUpadateList(resp.data);
                setState( prevState => ({...prevState, product: initialState.product, list}))
            })
            .catch (error => {
                console.error(error);
            })
    }

    const getUpadateList = (product) => {                                       // atualiza e retorna a lists de products
        console.log(product)
        const list = state.list.filter(p => p.id !== product.id)                // filter ja gera outra lista então eu não precisso clonar do state
        list.unshift(product);                                                  // estou removendo o produto da lista e mandando ele para  primeira posição
        return list;
    }

    
    
    const updateField = (event) => {                                            // Atualiza os campos
        const product = {...state.product};
        product[event.target.name] = event.target.value;                        // Pegando o nome da tag para passar para state, se o input for name ="name" =  protuct[name]
        setState( prevState => ({...prevState, product}));                      // event.target.value;  é o do event não o que esta na tag
    }

    const renderForm = () => {
        
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">               {/*Para dispositivos celurares o ocupe as 6 col (culunas)  se for mediao, grande ou extra grande ocupe as seis colunas*/}
                        <div className="form-group">
                            <label >Nome</label>
                            < input type="text" className="form-control"
                                name="name" value={state.product.name}     /* Em suma, quando o componente for INICIALMENTE renderizado o valor do input é = ao  state.product.name  */
                                onChange={e => updateField(e)}
                                placeholder="Digite o nome..."  />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Category</label>
                            <input type="text" className="form-control" 
                                name="category"
                                value={state.product.category}
                                onChange={e => updateField(e)} 
                                placeholder="Digite a caetgoria..."/>
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">                 {/*d-flex = display flex no bootstrat */}
                            <button className="btn btn-primary" 
                                onClick={e => save(e)}>
                                Salvar
                            </button>

                            <button className="btn btn-secundary ml-2"
                                onClick={e => clear(e)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const load = (product) => {                        // serve para atulizar o estado da aplicação
        setState(prevState => ({...prevState, product}));
    }

    const remove =  product => {
        axios.delete(`${baseUrl}/${product.id}`)
            .then( resp => {
                const list = state.list.filter(p => p.id !== product.id) ;
                setState(prevState => ({...prevState, list}));
            })
    } 

    function renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    const renderRows = () => {
        return state.list.map ( (product) => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => load(product)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => remove(product)}>
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
            {renderTable()}
        </Main>
    );
};

export default NotebookCrud;









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
    product: { name:"", category: ""},              //Isso se refere ao formulario
    list:[]
}

const NotebookCrud = () => {
    
    const [state, setState] = useState(initialState);

    const clear = ()  => {
        setState(prevState => ({ ...prevState, product: initialState.product }));
    }

    const save = () => {
        const product = state.product;                                    // so posso fazer isso, pois não vou alterar o state, se não era recomendado clonar o product (...state.product), aqui estou pegando a referencia dele
        const method = product.id ? 'put' : 'post';
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl;
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