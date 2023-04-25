import Main from "../template/MainComp";


import React from "react";

export default props =>
<Main icon="home" title="Início"                    /* o icon home veio do font-awonso*/
    subtitle="CRUD de Festas.">
    <div className="display-4">Bem Vindo!</div>
    <hr />
    <p className="mb-0">Um sistema para gerenciamento de festas!</p>
</Main>