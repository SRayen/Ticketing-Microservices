import "./index.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};
//RQ:
//Normal page component getInitialProps: context==={req,res}
//Custom App component getInitialProps: context==={Component,ctx:{req,res}}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  //To prevent the problem in case where getInitialProps is not defined in some components
  if (appContext.Component.getInitialProps) {
    //manually invoke other getInitialProps (LandingPage in our case (index)):
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  return {
    pageProps,
    ...data, //it contains currentUser
  };
};
export default AppComponent;
