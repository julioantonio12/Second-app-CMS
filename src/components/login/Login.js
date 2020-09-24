import React, {useState} from 'react'

export default function Login(){
	//Hook to login
	const [administrators, logIn] = useState({
		user: "",
		password: ""
	});

	//Capturing changes from the form to execute the hook's function
	const changeForm = e =>{ //'e' can be withouth parenthesis because it is just 1 attribute
		console.log(e.target.value)
		logIn({
			user: e.target.value,
			password: e.target.value
		})
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
						<form onChange={changeForm}>
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