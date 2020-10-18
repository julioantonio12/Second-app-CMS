import React, {useState} from 'react';
import $ from 'jquery';
import {routeAPI} from '../../../config/Config'

export default function CreateSlide(){
    //Hook to capture data
    const [slide, createSlide] = useState({
        image: null,
        title: "",
        description: ""

    })

    //onChange
    const changeFormPost = e =>{
        let image = $("#image").get(0).files[0];
                
        //Validating that image format is jpg or png
        if(image["type"] !== "image/jpeg" && image["type"] !== "image/png"){
            $("#image").val("");
            alert("Error. La imagen debe estar en formato JPG o PNG")
            $(".previewImg").attr("src", "");
            return;
        }
        //Validating size        
        else if(image["size"] > 2000000){ //2 million bytes = 2 MB
            $("#image").val("");
            alert("Error. La imagen no debe pesas más de 2 MB")
            $(".previewImg").attr("src", "");
            return;
        }
        else{
            //Codifying image in base 64
            let fileData = new FileReader;
            fileData.readAsDataURL(image);

            $(fileData).on("load", function(event){
                let fileRoute = event.target.result;
                console.log("fileRoute:", fileRoute);
                $(".previewImg").attr("src", fileRoute);
                createSlide({
                    'image': image,
                    'title': $("#title").val(),
                    'description': $("#description").val()
                })
            })
        }
    }

    //onSubmit
    const submitPost = async e => {
        e.preventDefault();
        //Destructuring in slide object
        const {image, title, description} = slide;
        //Validating that image doesn't have something
        if(image === null){
            $(".invalid-image").show();
            $(".invalid-image").html("La imagen no puede ir vacía");
            return;
        }

        //Validating RegEx for title
        if(title !== ""){
            const expTitle = /^([0-9a-zA-Z ]).{1,30}$/;
            if(!expTitle.test(title)){
                $(".invalid-title").show();
                $(".invalid-title").html("Utiliza un formamto que coincida con el solicitado");
            }
        }

        //Validating RegEx for description
        if(description !== ""){
            const expDescription = /^([0-9a-zA-Z ]).{1,100}$/;
            if(!expDescription.test(description)){
                $(".invalid-description").show();
                $(".invalid-description").html("Utiliza un formamto que coincida con el solicitado");
            }            
        }
        console.log("slide:", slide);
    }

    //Returning the component view
    return(
        <div className="modal fade" id="createSlide">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Crear Slide</h4>
                        <button type="button" className="close" data-dismiss="modal">x</button>
                    </div>
                    {/* When you are using files, such as an image, you need yo use encType in your form tag */}
                    <form onChange={changeFormPost} onSubmit={submitPost} encType="multipart/form-data">
                        <div className="modal-body">
                            {/* Image entry */}
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="image">*Peso máx. 2 MB | Formato: JPG o PNG</label>
                                <input
                                    id="image"
                                    type="file"
                                    className="form-control-file border"
                                    name="image"
                                    required
                                />
                                <div className="invalid-feedback invalid-image"></div>
                                <img className="previewImg img-fluid"/>
                            </div>
                            
                            {/* Title entry */}
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="title">*Solo letras y números.</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="far fa-newspaper"></i>
                                    </div>

                                    <input 
                                        id="title"
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
                                <label className="small text-secondary" htmlFor="description">*Solo letras y números.</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="far fa-file-alt"></i>
                                    </div>

                                    <input 
                                        id="description"
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