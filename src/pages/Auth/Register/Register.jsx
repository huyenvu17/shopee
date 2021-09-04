import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Button } from 'src/assets/styles/utils'
import { path } from 'src/constants/path'
import InputText from 'src/components/InputText/InputText'
import InputPassword from 'src/components/InputPassword/InputPassword'
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage'
import * as S from './register.style'
import { rules } from 'src/constants/rules'
import { useDispatch } from 'react-redux'
import { register } from '../auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
export default function Register() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmpassword: ''
    }
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const handleRegister = async data => {
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      const res = await dispatch(register(body))
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
          <S.FormTitle>Đăng ký</S.FormTitle>
          <S.Form onSubmit={handleSubmit(handleRegister)} noValidate>
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
            <S.FormControl>
              <Controller
                name="confirmpassword"
                control={control}
                rules={{
                  ...rules.confirmpassword,
                  validate: { samePassword: v => v === getValues('password') || 'Mật khẩu không khớp' }
                }}
                render={({ field }) => (
                  <InputPassword
                    name="confirmpassword"
                    placeholder="Nhập lại Mật khẩu"
                    onChange={field.onChange}
                    value={getValues('confirmpassword')}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="confirmpassword" />
            </S.FormControl>
            <S.FormButton>
              <Button type="summit">Đăng Ký</Button>
            </S.FormButton>
          </S.Form>
          <S.FormFooter>
            <span>Bạn đã có tài khoản chưa?</span>
            <Link to={path.login} className="link">
              Đăng Nhập
            </Link>
          </S.FormFooter>
        </S.FormWrapper>
      </S.Container>
    </S.StyledRegister>
  )
}
