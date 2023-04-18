import React, { useState } from "react";
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

    const getUpadateList = (product) => {
        const list = state.list.filter(p => p.id !== product.id)                // filter ja gera outra lista então eu não precisso clonar do state
        list.unshift(product);                                                  // estou removendo o produto com da lista e mandando ele para  primeira posição
        return list;
    }

    
    
    const updateField = (event) => {
        const product = {...state.product};
        product[event.target.name] = event.target.value;                        // Pegando o nome da tag para passar para state, se o input for name ="name" =  protuct[name]
        setState( prevState => ({...prevState, product}));
    }

    const renderForm = () => {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">               {/*Para dispositivos celurares o ocupe as 6 col (culunas)  se for mediao, grande ou extra grande ocupe as seis colunas*/}
                        <div className="form-group">
                            <label >Nome</label>
                            < input type="text" className="form-control"
                                name="name" value={state.product.name}
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
 
    return (
        <Main {...headerProps}>
            {renderForm()}
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