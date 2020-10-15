import React, {useState} from 'react';
import $ from 'jquery';
import {routeAPI} from '../../../config/Config'

export default function CreateAdmin(){
    //Hook to capture data
    const [administrators, createAdministrator] = useState({
        user: "",
        password: ""
    })

    //OnChange
    const changeFormPost = e =>{
        createAdministrator({
            ...administrators,
            [e.target.name] : e.target.value
        })        
    }

    //OnSubmit
    const submitPost = async e =>{
        console.log("Administrators:", administrators);
        $('.alert').remove();

        e.preventDefault();
        
        //Destructuring
        const {user, password} = administrators;
        //Validating that user field isn't empty
        if(user === ""){
            $(".invalid-user").show();
            $(".invalid-user").html("Completa este campo");
            return; //if this happens, it won't continue the data send
        }

        //Validating Regex
        const expUser = /^(?=.*[A-Za-z]).{2,6}$/; //Regex in react it needs to start with /^ and end with $/
        if(!expUser.test(user)){
            $(".invalid-user").show();
            $(".invalid-user").html("Utiliza un formato que coincida con el solicitado.");
            return;
        }

        //Validating that password field isn't empty
        if(password === ""){
            $(".invalid-password").show();
            $(".invalid-password").html("Completa este campo");
            return; //if this happens, it won't continue the data send
        }

        //Validating Regex
        const expPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/; //Regex in react it needs to start with /^ and end with $/
        if(!expPassword.test(password)){
            $(".invalid-password").show();
            $(".invalid-password").html("Utiliza un formato que coincida con el solicitado.");
            return;
        }

        //Executing POST service
        const result = await postData(administrators);
        if(result.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
        }
        if(result.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${result.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href="/";},3000) //giving 3 seconds to reload page
        }
    }

    //Returning component view
    return(
        <div className="modal" id="createAdmin">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Crear Administrador</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    <form onChange={changeFormPost} onSubmit={submitPost}>
                        <div className="modal-body">   
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="user">*Mínimo 2 caracteres, máximo 6, sin números</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <input 
                                        id = "user"
                                        type="text"
                                        className="form-control text-lowercase"
                                        name="user"
                                        placeholder="Ingrese el usuario*"
                                        minLength="2"
                                        maxLength="6"
                                        pattern="(?=.*[A-Za-z]).{2,6}"
                                        required
                                    />
                                    <div className="invalid-feedvack invalid-user"></div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="password">*Mínimo 8 caracteres, letras en mayúscula, minúscula y números</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-key"></i>
                                    </div>
                                    <input 
                                        id = "password"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Ingrese la contraseña*"
                                        minLength="8"
                                        pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}"
                                        required
                                    />
                                    <div className="invalid-feedvack invalid-password"></div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer d-flex justify-content-between">                    
                            <div><button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button></div>
                            <div><button type="submit" className="btn btn-primary">Enviar</button></div>
                        </div>
                    </form>

                </div>                
            </div>
        </div>   
    )
}

//Petition Post for Administrators
const postData = data =>{
    console.log("data:", data);
    const url = `${routeAPI}/crear-administrador`;
    const token = localStorage.getItem("ACCESS_TOKEN");
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    }
    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    })
}