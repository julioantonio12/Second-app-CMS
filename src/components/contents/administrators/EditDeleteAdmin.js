import React, {useState} from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2';
import {routeAPI} from '../../../config/Config'

export default function EditDeleteAdmin(){
    //Hook to capture data
    const [administrators, editAdministrator] = useState({
        user: "",
        password: "",
        id: ""
    })

    //OnChange
    const changeFormPost = e =>{
        editAdministrator({
            ...administrators,
            [e.target.name] : e.target.value
        })        
    }

    //OnSubmit
    const submitPost = async e =>{                
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

        if(password !== ""){
            //Validating Regex
            const expPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/; //Regex in react it needs to start with /^ and end with $/
            if(!expPassword.test(password)){
                $(".invalid-password").show();
                $(".invalid-password").html("Utiliza un formato que coincida con el solicitado.");
                return;
            }
        }

        //Executing PUT service
        const result = await putData(administrators);
        if(result.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
        }
        if(result.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${result.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href="/";},3000) //giving 3 seconds to reload page
        }
    }

    //Capturing data to edit
    $(document).on("click", ".editInputs", function(e){
        e.preventDefault();
        let data = $(this).attr("data").split(',');
        $("#editUser").val(data[1]);
        editAdministrator({            
            'user' : $("#editUser").val(),
            'password' : $("#editPassword").val(),
            'id' : data[0]
        })
    })

    //Capturing data to delete
    $(document).on("click", ".deleteInput", function(e){
        e.preventDefault();
        let data = $(this).attr("data").split(',')[0];
        $("#editUser").val(data[1]);

        //Asking if are you sure about deleting the admin
        Swal.fire({
            title: '¿Estás seguro de eliminar este registro?',
            text: "Si no lo está puede cancelar la acción.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar registro'
        }).then((result) => {
            if (result.value) {
                const deleteAdministrator = async ()=>{
                    //Executing DELETE service
                    const result = await deleteData(data);
                    if(result.status === 400){
                        Swal.fire({
                            type:"error",
                            title: result.mensaje,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                        }).then(function(result){
                            if(result.value){
                                window.location.href = "/";
                            }
                        })
                    }
                    if(result.status === 200){
                        Swal.fire({
                            type:"success",
                            title: result.mensaje,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                        }).then(function(result){
                            if(result.value){
                                window.location.href = "/";
                            }
                        })
                        // setTimeout(()=>{window.location.href="/";},3000) //giving 3 seconds to reload page
                    }
                }
                deleteAdministrator();                

            }
        })
    })

    //Returning component view
    return(
        <div className="modal" id="editAdmin">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Editar Administrador</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    <form onChange={changeFormPost} onSubmit={submitPost}>
                        <div className="modal-body">   
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editUser">*Mínimo 2 caracteres, máximo 6, sin números</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <input 
                                        id = "editUser"
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
                                <label className="small text-secondary" htmlFor="editPassword">*Mínimo 8 caracteres, letras en mayúscula, minúscula y números</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-key"></i>
                                    </div>
                                    <input 
                                        id = "editPassword"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Ingrese la contraseña*"
                                        minLength="8"
                                        pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}"
                                        // required
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

//Petition PUT for Administrators
const putData = data =>{
    console.log("data:", data);
    const url = `${routeAPI}/editar-administrador/${data.id}`; //${data.id} that's the way to send the id of the admin that you want to edit
    const token = localStorage.getItem("ACCESS_TOKEN");
    const params = {
        method: 'PUT',
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

//Petition DELETE for Administrators
const deleteData = data =>{
    const url = `${routeAPI}/borrar-administrador/${data}`; //${data.id} that's the way to send the id of the admin that you want to edit
    const token = localStorage.getItem("ACCESS_TOKEN");
    const params = {
        method: 'DELETE',
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