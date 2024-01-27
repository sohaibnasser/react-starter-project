import React from "react";
import LoginComp from "../../../components/loginComp/loginComp";

function LoginView() {
    return ( 
        <div
        className={`p-3 bodyBgColor`}
      >
        <div
          className={`site-layout-content bodyBgColor`}
        >
          <LoginComp setLogin={(isLogged) => this.props.setLogin(isLogged)}/>
        </div>
      </div>
     );
}

export default LoginView;
