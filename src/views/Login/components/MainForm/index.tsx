import React from "react";
import { useForm } from "react-hook-form";
import { Button, message as ms } from "antd";
import { FormType } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import "./index.scss";
import { validationSchema } from "./scheme";
import FormItem from "../FormItem";
import { userDetail } from "../../../../store/auth";
import { useRecoilState } from "recoil";
import { useLoginWithEmailMutation } from "../../../../graphql/user";
import { AUTH_TOKEN } from "../../../../constants/ApiConstant";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const MainForm = () => {
  const [_cookie, setCookie] = useCookies([AUTH_TOKEN]);
  const [_, setUser] = useRecoilState(userDetail);
  const navigate = useNavigate();

  const [loginWithEmailMutation, loginWithEmailMutationResult] =
    useLoginWithEmailMutation({
      onCompleted: ({ result }) => {
        setCookie(AUTH_TOKEN, result, {
          path: "/",
        });
        const res = getValues();
        setUser({ ...res, isAuth: true });
        navigate("/main");
      },
      onError: ({ message }) => {
        // setError("Email or password is incorrect!");
        ms.error({
          content: message,
          style: {
            marginTop: "30px",
          },
        });
      },
    });

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormType) => {
    console.log(data, "data");
    loginWithEmailMutation({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <>
      <form className="main__form" onSubmit={handleSubmit(onSubmit)}>
        <FormItem
          errorMessage={errors.email?.message}
          control={control}
          name="email"
          type="email"
          placeholder="Email"
        />
        <FormItem
          errorMessage={errors.password?.message}
          control={control}
          name="password"
          type="password"
          placeholder="Password"
        />

        <Button
          loading={loginWithEmailMutationResult.loading}
          type="primary"
          htmlType="submit"
        >
          Sign In
        </Button>
      </form>
      <p className="error__text">
        {JSON.stringify(loginWithEmailMutationResult.error?.message)}
      </p>
    </>
  );
};

export default MainForm;
