import React, { useContext } from 'react';
import firebase from "firebase/app";
import 'firebase/auth';
import firebaseConfig from '../../firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import siteLogo from '../../creative-agency-resources/images/logos/logo.png';
import googleIcon from '../../creative-agency-resources/images/google.png';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";

firebase.initializeApp(firebaseConfig);

const Login = () => {

    const {loggedInUser, setLoggedInUser, isAdmin} = useContext(UserContext)
    
    const history = useHistory();
    const location = useLocation();
  
    const { from } = location.state || { from: { pathname: isAdmin ? '/admin/serviceList' : '/dashboard/serviceList'} };

  const handleGoogleSignIn = () =>{
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const {displayName, email, photoURL} = result.user;
            const signedInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
            }
            setLoggedInUser(signedInUser);
            sessionStorage.setItem(`userInfo`, JSON.stringify(signedInUser));
            storeAuthToken();
            history.replace(from);
          })
          .catch(error => alert(error.message));
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
           sessionStorage.setItem('token', idToken);
          }).catch(function(error) {
            // Handle error
          });
    }

    const handleSignOut = () => {
        setLoggedInUser({});
        sessionStorage.removeItem('token');
        sessionStorage.removeItem(`userInfo`);
    }



    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(result => {
            const {displayName, email, photoURL} = result.user;
            const signedInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
            }
            setLoggedInUser(signedInUser);
            sessionStorage.setItem(`userInfo`, JSON.stringify(signedInUser));
            storeAuthToken();
            history.replace(from);
        })
        .catch(error => alert(error.message));

    }

    return (
        <div className='login_container'>
            <div className='container col-sm-10 col-md-8 col-lg-6 '>          
                <div className='col-sm-10 col-md-8 col-lg-6 logo_container'>
                    <Link to='/'><img className='tree_img_logo' src={siteLogo} alt=""/></Link>
                </div>
                <div className='popupSignInContainer'>
                   { 
                        loggedInUser.isSignIn ?
                        <button onClick={handleSignOut} className='btn_brand'>Log Out</button>
                        :
                        <>
                            <div className='p-2 ml-auto mr-auto mb-2 notice'>
                                <p className='mt-0 mb-0'><strong>Note That: </strong>If you want check Admin Panel? Then you must use.<br/></p>
                                <p ><strong>email:</strong><span> admin@gmail.com</span><br/><strong>Password:</strong><span> @admin123</span></p>
                                <p>Else you see user panel</p>
                            </div>
                            <div className='Pass_login mb-4 ml-auto mr-auto text-left'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="pass_login_input">
                                        <label htmlFor="email">Email</label><br/>
                                        <input type="email" id='email' name='email' defaultValue='admin@gmail.com' className="input_field"  placeholder="Email"ref={register({ required: true })}/>
                                    </div>
                                    <div className="pass_login_input">
                                        <label htmlFor="pass">Password</label><br/>
                                        <input type="password" id='pass' name='password' defaultValue='@admin123' className="input_field" placeholder="Password" ref={register({ required: true })}/>
                                    </div>
                                    <button type="submit" className="btn btn-dark mt-5 pt-1 pb-1 pl-3 pr-3 d-block ml-auto mr-auto">Login</button>
                                </form>
                            </div>
                            <h5>OR</h5>
                            <div onClick={handleGoogleSignIn} className='popupSignIn'>
                                <img src={googleIcon} alt="sign in with google"/>
                                <p className='continue'>Continue with Google</p>
                            </div>
                            <p>Don't Have a Account? <Link onClick={handleGoogleSignIn} to='#'>Create an Account</Link></p>
                        </>
                   }
                </div>
            </div>
       </div>
    );
};

export default Login;