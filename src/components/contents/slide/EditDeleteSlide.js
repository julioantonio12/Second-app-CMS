import React, {useState} from 'react';
import $ from 'jquery';
import notie from 'notie';
import {routeAPI} from '../../../config/Config'
import Swal from 'sweetalert2';

export default function EditDeleteSlide(){

    //onChange
    const changeFormPut = e =>{
    
    }

    const submitPut = async e => {
    
    }

    //Capturing data to edit
    $(document).on("click", ".editInputs", function(e){
        e.preventDefault();
        let data = $(this).attr("data").split("_,");
        console.log("data:",data)
        $(".previewImg").attr("src", `${routeAPI}/mostrar-img/${data[1]}`)
        $("#editTitle").val(data[2]);
        $("#editDescription").val(data[3]);
    })

    //Returning component view
    return(
        <div className="modal fade" id="editSlide">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Editar Slide</h4>
                        <button type="button" className="close" data-dismiss="modal">x</button>
                    </div>
                    {/* When you are using files, such as an image, you need yo use encType in your form tag */}
                    <form onChange={changeFormPut} onSubmit={submitPut} encType="multipart/form-data">
                        <div className="modal-body">
                            {/* Image entry */}
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editImage">*Peso máx. 2 MB | Formato: JPG o PNG</label>
                                <input
                                    id="editImage"
                                    type="file"
                                    className="form-control-file border"
                                    name="image"
                                    required
                                />
                                <div className="invalid-feedback invalid-image"></div>
                                <img className="previewImg img-fluid" alt=""/>
                            </div>
                            
                            {/* Title entry */}
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editTitle">*Solo letras y números.</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="far fa-newspaper"></i>
                                    </div>

                                    <input 
                                        id="editTitle"
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Ingrese el título*"
                                        pattern="([0-9a-zA-Z ]).{1,30}"
                                    />
                                    <div className="invalid-feedback invalid-title"></div>
                                </div>
                            </div>

                            {/* Description entry */}
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editDescription">*Solo letras y números.</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="far fa-file-alt"></i>
                                    </div>

                                    <input 
                                        id="editDescription"
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        placeholder="Ingrese la descripción*"
                                        pattern="([0-9a-zA-Z ]).{1,100}"
                                    />
                                    <div className="invalid-feedback invalid-description"></div>
                                </div>
                            </div>

                        </div>

                        <div className="modal-footer d-flex justify-content-between">
                            <div>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>        
    )
}