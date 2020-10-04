import React, {useState} from 'react'
//Api route. When you upload the site, you just have to go to this route and change the config
import {routeAPI} from '../../config/Config' 
import $ from "jquery" //Import jquery in a private way

export default function Login(){
	//Hook to login
	const [administrators, logInChanges] = useState({
		user: "",
		password: ""
	});

	//Capturing changes from the form to execute the hook's function
	const changeForm = e =>{ //'e' can be withouth parenthesis because it is just 1 attribute
		logInChanges({
			...administrators,
			[e.target.name]: e.target.value, //the "name" value is the name of the input
		})
	}

	const logIn = async e =>{
		$(".alert").remove();
		e.preventDefault(); //Allows you to prevent any default function using submit from your browser
		const result = await loginAPI(administrators);
		// console.log("Result", result);
		if(result.status !== 200){
			$("button[type='submit']").before(`<div class="alert alert-danger">${result.mensaje}
				</div>`)
		}
		else{
			// $("button[type='submit']").before(`<div class="alert alert-success">${result.token}
			// 	</div>`)	
			localStorage.setItem("ACCESS_TOKEN", result.token)
			localStorage.setItem("ID", result.data._id);
			localStorage.setItem("USER", result.data.user)

			//this reloads the login page to execute the getAccessToken() function that is inside App.js
			window.location.href = "/"; 
		}
	}

	// Return the view to login
    return(
		<div className="login-page" style={{ minHeight: "512.391px" }}>
			<div className="login-box">
				<div className="login-logo">
					<b>Gestor de contenidos</b>
				</div>			
				<div className="card">
					<div className="card-body login-card-body">
						<p className="login-box-msg">
							Ingresa los campos para iniciar sesión
						</p>
						<form onChange={changeForm} onSubmit={logIn}>
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Usuario"
									name="user"					
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-user"></span>
									</div>
								</div>
							</div>
							<div className="input-group mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Password"
									name="password"
								
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-lock"></span>
									</div>
								</div>					
							</div>
							<button
								type="submit"
								className="btn btn-primary btn-block"
							>
								Ingresar
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
    )
}

//Petition POST for Login
const loginAPI = data =>{ //data is the variable sent: "administrators"
	const url = `${routeAPI}/login`
	const params = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		}
	}
	return fetch(url, params).then(response =>{ //This return a promise
		return response.json();
	}).then(result =>{
		return result;
	})	
	.catch(err =>{
		return err;
	})
}