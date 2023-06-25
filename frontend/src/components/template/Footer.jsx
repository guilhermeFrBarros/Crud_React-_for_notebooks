import "./Footer.css";
import React from "react";

export default (props) => (
    <footer className="footer">
        <span className="footer-conteudo">
            Desenvolvido com <i className="fa fa-heart text-danger"></i> por
            <strong>
                {" "}
                André <span className="text-danger">Luiz </span>e Guilherme{" "}
                <span className="text-danger">Barros</span>
            </strong>
        </span>
    </footer>
);
