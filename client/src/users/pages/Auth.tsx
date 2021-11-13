import { FC, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "../styles/auth.scss";
import {
  AuthInit,
  StepOne,
  StepTow,
  StepThree,
  StepFour,
  StepFive,
} from "../components/AuthSteps/AuthSteps";
import axios from "axios";
import { authLogin, authRegister } from "../store/user.actions";

const Auth: FC = () => {
  const dispatch = useDispatch();
  const { user, loading, token } = useSelector(
    (state: any) => state.userModule
  );
  const [login, setLogin] = useState(true);
  const [step, setStep]: any = useState(0);
  const [name, setName]:any = useState();
  const [expertises, setExpertises]: any = useState([]);
  const [interests, setInterests]: any = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const fetchData = async () => {
    const exResponse: any = await axios.get(
      "http://localhost:8000/api/expertise"
    );
    const inResponse: any = await axios.get(
      "http://localhost:8000/api/interest"
    );
    setExpertises(exResponse.data);
    setInterests(inResponse.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authSwitch = () => {
    setLogin(!login);
  };

  const googleAuthSuccess = async (response: any) => {
    const { tokenId } = response;
    
    await dispatch(authLogin({ tokenID: tokenId }));
    if (!token) {
      setName(response.profileObj.name);
      setValue("tokenID", tokenId);

      const { tokenID } = getValues();
      if (tokenID) setStep(1);
    }
  };

  const facebookAuthSuccess = async (response: any) => {
    const { accessToken, userID } = response;
    
    await dispatch(authLogin({ tokenID: accessToken, userID: userID }));
    if (!token) {
      setName(response.name);
      setValue("tokenID", accessToken);
      setValue("userID", userID);

      const { tokenID } = getValues();
      if (tokenID && userID) setStep(1);
    }
  };

  const onStepOneSubmit = (data: any) => {
    console.log(getValues('username').length);
    
    setStep(2);
  };
  const onStepTowSubmit = (data: any) => {
    const { linkedin_url } = getValues();
    if (linkedin_url) setStep(3);
  };
  const onStepThreeSubmit = (data: any) => {
    const { phone_number } = getValues();
    if (phone_number) setStep(4);
  };
  const onStepFourSubmit = (data: any) => {
    const { expertise } = getValues();
    if (expertise) setStep(5);
  };
  const onFinalSubmit = async (data: any) => {
    dispatch(authRegister(data));
  };

  let authRedirect = null;
  if (token !== null) {
    authRedirect = <Redirect to="/" />;
  }

  let auth = (
    <AuthInit
      googleKey={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
      facebookKey={process.env.REACT_APP_FACEBOOK_AUTH_APP_ID}
      login={login}
      authSwitch={authSwitch}
      googleAuthSuccess={googleAuthSuccess}
      facebookAuthSuccess={facebookAuthSuccess}
    />
  );
  if (step === 1) {
    auth = (
      <StepOne
        name={name}
        submit={handleSubmit(onStepOneSubmit)}
        setInputValue={register}
        watch={watch}
      />
    );
  }
  if (step === 2) {
    auth = (
      <StepTow
        submit={handleSubmit(onStepTowSubmit)}
        setInputValue={register}
        watch={watch}
      />
    );
  }
  if (step === 3) {
    auth = (
      <StepThree
        submit={handleSubmit(onStepThreeSubmit)}
        setInputValue={register}
        watch={watch}
      />
    );
  }
  if (step === 4) {
    auth = (
      <StepFour
        submit={handleSubmit(onStepFourSubmit)}
        setInputValue={register}
        expertises={expertises}
        watch={watch}
      />
    );
  }
  if (step === 5) {
    auth = (
      <StepFive
        submit={handleSubmit(onFinalSubmit)}
        setInputValue={register}
        interests={interests}
        watch={watch}
      />
    );
  }

  return (
    <>
      {authRedirect}
      {auth}
    </>
  );
};

export default Auth;
