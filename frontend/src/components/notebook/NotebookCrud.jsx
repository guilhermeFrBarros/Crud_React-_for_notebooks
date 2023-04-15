import React from "react";
import Main from "../template/MainComp";

const headerProps = {
    icon:"laptop",
    title: "Notebooks",
    subtitle: "Cadastro de Notebooks: Incluir, Listar, Alterar e Escluir"
}


const NotebookCrud = () => {
    return (
        <Main {...headerProps}>
            Cadastro de Notebook
        </Main>
    );
};

export default NotebookCrud;
