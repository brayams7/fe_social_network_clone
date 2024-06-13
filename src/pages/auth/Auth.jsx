import React, { useEffect, useState } from "react";
import "./auth.css";
import Logo from "../../assets/img/img/logo.png";
import { useForm } from "react-hook-form";
import { resetValues } from "../../utilsFuntions/utilsForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { getUserData, getToken } from '../../helpers/authLocalStorage';
const TYPES = {

  login:"login",
  singUp:"singUp"

}

const Auth = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, isError, auth } = useSelector(state => state.auth )

  const [isSingUp, setIsSingUp] = useState(false)

  const handleChangeSingUp = ()=> setIsSingUp(!isSingUp)
  
  const handleDataForm = (data, type)=>{
    if(type === TYPES.login) dispatch(login(data, navigate))
  }

  useEffect(()=>{

    const token = getToken()
    const userData = getUserData()
    
    if(token && userData) navigate("/home")

  },[navigate])

  return (
    <div className="auth_container">
      <div className="auth_left">
        <img src={Logo} alt="logo" />
        <div className="auth_webname">
          <h1>BRAYCK Media</h1>
          <h6>Explora todas las ideas del mundo</h6>
        </div>
      </div>
      {
        isSingUp ? (
          <SingUp 
            handleChangeSingUp={handleChangeSingUp}
            handleDataForm={handleDataForm}
            loading={loading}
          />

        ):(
            
            <LogIn 
              handleChangeSingUp={handleChangeSingUp} 
              handleDataForm={handleDataForm}
              loading={loading}
              isError={isError}
            />
        )
      }
    </div>
  );
};


const LogIn = ({
  handleChangeSingUp,
  handleDataForm,
  loading,
  isError
}) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // const [password, setPassword] = useState("");

  const onSubmit = (data) => {
    const listData = [
      
      {
        name: "username",
        value: "",
      },
      {
        name: "password",
        value: "",
      },
    ];
    handleDataForm(data, TYPES.login)
    resetValues(listData, setValue);
  };

  return (
    <div className="auth_right" onSubmit={handleSubmit(onSubmit)}>
      <form className="form_auth form_auth-m">
        <h3>Login</h3>
        {
          isError && (
            <p>Credenciales incorrectas</p>
          )
        }
        <div className="form_input_container-custom">
          <input
            type="text"
            className="custom_input custom_input-username"
            name="username"
            {...register("username", {
              required: {
                value: true,
                message: "El campo es requerido",
              },
            })}
            placeholder="Username"
          />
          {errors?.username && (
            <p className="custom_error_message">{errors?.username?.message}</p>
          )}
        </div>
        <div className="form_input_2_container-custom">
            <input
              type="password"
              className="custom_input"
              name="password"
              placeholder="Contraseña"
              minLength={8}
              {...register("password", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 Dígitos",
                },
                // onChange: (e) => setPassword(e.target.value),
              })}
              // value={password}
            />
            {errors?.password && (
              <p className="custom_error_message">
                {errors?.password?.message}
              </p>
            )}
          </div>
        
        <div>
          <span 
            style={{ fontSize: 12, cursor:'pointer' }}
            onClick={()=>handleChangeSingUp()}
          >
            ¿No tienes un CUENTA? Registrate
          </span>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="button_util w-75" disabled={loading}>
            {
              !loading ? "Login" : "Loading..." 
            }
          </button>
        </div>
      </form>
    </div>
  )
} 

const SingUp = ({
  handleChangeSingUp
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    const listData = [
      {
        name: "firstName",
        value: "",
      },
      {
        name: "lastName",
        value: "",
      },
      {
        name: "username",
        value: "",
      },
      {
        name: "password",
        value: "",
      },
      {
        name: "confirmPassword",
        value: "",
      },
    ];
    setPassword("");
    setConfirmPassword("");
    resetValues(listData, setValue);
  };

  const validateConfirmPassword = (confPass = "") => {
    if (confPass !== password) return "Las contraseñas no coinciden";
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

 

  return (
    <div className="auth_right" onSubmit={handleSubmit(onSubmit)}>
      <form className="form_auth form_auth-m">
        <h3>Registrate</h3>
        <div>
          <div className="form_input_2_container-custom">
            <input
              type="text"
              name="firstName"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
              })}
              placeholder="Primer nombre"
              className="custom_input"
            />
            {errors?.firstName && (
              <p className="custom_error_message">
                {errors?.firstName?.message}
              </p>
            )}
          </div>

          <div className="form_input_2_container-custom">
            <input
              type="text"
              name="lastName"
              {...register("lastName", {
                required: false,
              })}
              placeholder="segundo nombre"
              className="custom_input"
            />
            {errors?.lastName && (
              <p className="custom_error_message">
                {errors?.lastName?.message}
              </p>
            )}
          </div>
        </div>
        <div className="form_input_container-custom">
          <input
            type="text"
            className="custom_input custom_input-username"
            name="username"
            {...register("username", {
              required: {
                value: true,
                message: "El campo es requerido",
              },
            })}
            placeholder="Username"
          />
          {errors?.username && (
            <p className="custom_error_message">{errors?.username?.message}</p>
          )}
        </div>

        <div>
          <div className="form_input_2_container-custom">
            <input
              type="password"
              className="custom_input"
              name="password"
              placeholder="Contraseña"
              minLength={8}
              {...register("password", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 Dígitos",
                },
                onChange: (e) => setPassword(e.target.value),
              })}
              value={password}
            />
            {errors?.password && (
              <p className="custom_error_message">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <div className="form_input_2_container-custom">
            <input
              type="password"
              className="custom_input"
              name="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
                onChange: (e) => onChangeConfirmPassword(e),
                validate: (value) => validateConfirmPassword(value),
              })}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
            />
            {errors?.confirmPassword && (
              <p className="custom_error_message">
                {errors?.confirmPassword?.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <span
            style={{ fontSize: 12, cursor:'pointer' }}
            onClick={()=>handleChangeSingUp()}
          >ya tienes creada un CUENTA!</span>
        </div>

        <button type="submit" className="button_util button_submit-auth">
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default Auth;
