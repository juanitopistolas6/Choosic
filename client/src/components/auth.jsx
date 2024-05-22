import React, { useState, useContext} from 'react';
import { Link, Navigate, useNavigate  } from 'react-router-dom';
import { ContextoUsuario } from '../context/contextoUsuario';
import { getCookie } from '../apiFunctions';

function Authsl() {
    const [userExists, setUserExist] = useState(false);
    const [userName, setUserName] = useState("")
    const [formStep, setFormStep] = useState(1)
    const {userData, setUserData} = useContext(ContextoUsuario)
    const [password, setPassword] = useState({
        password1 : "",
        password2: ""
    })
    const [userId, setUserId] = useState(undefined)
    const navigate = useNavigate()



    const generarNombreAleatorio = () => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let nombreAleatorio = 'INVITADO-';
        for (let i = 0; i < 4; i++) {
            console.log("hoa")
            nombreAleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return nombreAleatorio;
    };

    const handleEnterUser = async () => {
        const userNameT = userName;
        if (userNameT == ""){
            const guesUsername = generarNombreAleatorio()
            setUserData({userId:undefined, userName: guesUsername ,userGuest:true})
            navigate("/options")
            console.log(userData,userNameT,formStep)
        }else{
            
            const response = await fetch(`http://localhost:3003/api/name/${userNameT}`);
            
            if (response.ok) {
                const data = await response.json()
                setUserId(data.user_id)
                setUserExist(true);
            } else {
                setUserExist(false);
            }

        }
        handleNextStep()
    };

    const HandleAuth = async () => {
        const userIdAuth = userId
        const UserPassword = password.password1

        const response = await fetch(`http://localhost:3003/api/users/${userIdAuth}/${UserPassword}`)

        if (response.ok) {

            const data = await response.json()


            console.log("El usuario y contraseña son correctos",userName)
            document.cookie = `userId=${userId}; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;`;
            document.cookie = `userPassword=${UserPassword}; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;`;
            setUserData({...userData,userId,userName, userGuest: false})
            navigate("/options")

        } else {
            console.log("La contraseña no es cofrecta",UserPassword)
        }
    }

    const handleRegisterUser = async () => {
        console.log(userName, password )
        
        if(password.password1 === password.password2){
            if(password.password1 != ""){
                if(password.password1.length > 5){
                    try {
                          const response1 = await fetch('http://localhost:3003/api/register', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ userName, password: password.password1 }) 
                          });
                  
                          if (response1.ok) {
                            const response2 = await fetch(`http://localhost:3003/api/name/${userName}`);
            
                

                            if (response2.ok) {
                                console.log("Como estas")
                                const data = await response2.json()
                                setUserId(data.user_id)
                                
                                document.cookie = `userId=${data.user_id}; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;`;
                                document.cookie = `userPassword=${password.password1}; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;`;
                                console.log('Usuario creado exitosamente',data.user_id,getCookie("userId"));
                                setUserData({...userData,userId:data.user_id, userName})
                                navigate("/options")
                                
                            }
                
            
                          } else {
                            console.error('Error al crear el usuario:', response1.statusText);
            
                          }
            
                    } catch (error) {
                      console.error('Error de red:', error);
            
                    }
                }else{
                    console.log("La contraseña es muy corta")
                }
            }else{
                console.log("La contraseña no puede ser un espacio vacio")
            }
        }else{
            console.log("las contraseñas no son correctas")
        }
      };
    const handleNextStep = () => {
        setFormStep(prevStep => prevStep + 1);
    };

    const handlePrevStep = () => {
        setFormStep(prevStep => prevStep - 1);
    };

    let stepComponent;

    const usuarioExiste = (
        <div className="bg-green-100 shadow-md rounded px-8 w-content pt-6 pb-8 mb-4 mx-auto text-center"
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className="mb-8" >
                <h1 className="block text-gray-70 0 font-bold mb-2 text-2xl" htmlFor="username">
                    Hola de nuevo <p className='text-green-800'>{userName}</p>
                </h1>
                <h4>
                    Si no eres tu puedes volver al paso anteror e ingresar otro nombre de usuario
                </h4>
                <input
                    className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="username"
                    type="text"
                    onChange={(e) => setPassword({...password, password1: e.target.value})}
                    placeholder="Ingrese la contraseña"

                />
            </div>

            <div className="mb-4">
                <button onClick={HandleAuth}
                    className="bg-amber-900 hover:bg-amber-950 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Ingresar
                </button>

            </div>
        </div>
    )


    const usuarioNoExiste = (
        <div className="bg-green-100 shadow-md rounded px-8 w-content pt-6 pb-8 mb-4 mx-auto text-center"
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className="mb-8" >
                <h1 className="block text-gray-70 0 font-bold mb-2 text-2xl" htmlFor="username">
                    Ingresa una contraseña para poder registrarte con el nombre de {userName}
                </h1>
                <h4>
                    Si ya tienes una cuenta puedes volver al los pasos anteriores
                </h4>
                <input
                    className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="username"
                    type="password"
                    onChange={(e) => setPassword({...password, password1: e.target.value})}
                    placeholder="Ingrese la contraseña"

                />
                <h1>Confirme la contraseña</h1>
                <input
                    className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="username"
                    type="password"
                    onChange={(e) => setPassword({...password, password2: e.target.value})}
                    placeholder="Confirmar contraseña"

                />
            </div>

            <div className="mb-4">
                <button onClick={handleRegisterUser}
                    className="bg-amber-900 hover:bg-amber-950 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Registrarse
                </button>

            </div>
        </div>
    )



    switch (formStep) {
        case 1:
            stepComponent = (
                <>
                    <h1 className="text-green-100 text-5xl font-sans font-bold m-11">Bienvenido a Choosic</h1>
                    <div className="bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-content md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto text-center"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className="mb-8" >
                            <label className="block text-gray-70 0 text-sm font-bold mb-2" htmlFor="username">
                                Ingresa un nombre de usuario para entrar o deja el espacio en blanco para obtener uno aleatorio
                            </label>
                            <input
                                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="username"
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Ingrese su nombre de usuario"

                            />
                        </div>

                        <div className="mb-4">
                            <button onClick={handleEnterUser}
                                className="bg-amber-900 hover:bg-amber-950 duration-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Ingresar
                            </button>

                        </div>
                    </div>

                </>
            );
            break;
        case 2:
            stepComponent = (
                <div>
                    {userExists ? (
                        usuarioExiste
                    ) : (
                        usuarioNoExiste
                    )}
                </div>
            );
            break;
        case 4:
            stepComponent = (
                <Navigate to="/opciones"></Navigate>
            )
        default:
            stepComponent = <div>No se ha definido ningún paso.</div>;
    }

    return (
        <div className='container mx-auto p-8 items-center flex flex-col justify-center h-full w-full'>
            {stepComponent}
            {formStep !== 1 && (
                <div className=''>
                    <button disabled={formStep === 1} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handlePrevStep}>Anterior</button>
                    <button disabled={formStep === 2} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4' onClick={handleNextStep}>Siguiente</button>
                </div>
            )}
        </div>
    );
}

export default Authsl;