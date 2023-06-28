import React from "react";

export default function Label(props) {
    let email = props.email;

    console.log(email);
    let arroba = "@";
    let usuario = email.substring(0, email.indexOf(arroba));

    return (
        <div>
            <h1>
                Bem Vindo <strong>{usuario}</strong>
            </h1>
        </div>
    );
}
