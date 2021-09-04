import React from 'react'
import InputText from 'src/components/InputText/InputText'
import InputPassword from 'src/components/InputPassword/InputPassword'
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage'
import * as S from '../Register/register.style'
import { useForm, Controller } from 'react-hook-form'
import { rules } from 'src/constants/rules'
import { Link, useHistory } from 'react-router-dom'
import { path } from 'src/constants/path'
import { Button } from 'src/assets/styles/utils'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { login } from '../auth.slice'
export default function Login() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogin = async data => {
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      const res = await dispatch(login(body))
      unwrapResult(res)
      history.push(path.home)
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key, {
            type: 'server',
            message: error.data[key]
          })
        }
      }
    }
  }

  return (
    <S.StyledRegister>
      <S.Container className="container">
        <S.Banner />
        <S.FormWrapper>
          <S.FormTitle>Đăng Nhập</S.FormTitle>
          <S.Form onSubmit={handleSubmit(handleLogin)} noValidate>
            <S.FormControl>
              <Controller
                name="email"
                control={control}
                rules={rules.email}
                render={({ field }) => (
                  <InputText
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={field.onChange}
                    value={getValues('email')}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="email" />
            </S.FormControl>
            <S.FormControl>
              <Controller
                name="password"
                control={control}
                rules={rules.password}
                render={({ field }) => (
                  <InputPassword
                    name="password"
                    placeholder="Mật khẩu"
                    onChange={field.onChange}
                    value={getValues('password')}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="password" />
            </S.FormControl>

            <S.FormButton>
              <Button type="summit">Đăng Nhập</Button>
            </S.FormButton>
          </S.Form>
          <S.FormFooter>
            <span>Bạn mới biết đến Shoppe?</span>
            <Link to={path.register} className="link">
              Đăng Nhập
            </Link>
          </S.FormFooter>
        </S.FormWrapper>
      </S.Container>
    </S.StyledRegister>
  )
}
