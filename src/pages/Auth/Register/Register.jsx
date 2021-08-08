import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Button } from 'src/assets/styles/utils'
import { path } from 'src/constants/path'
import InputText from 'src/components/InputText/InputText'
import InputPassword from 'src/components/InputPassword/InputPassword'
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage'
import * as S from './register.style'
import { rules } from 'src/constants/rules'
import http from 'src/utils/http'
export default function Register() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmpassword: ''
    }
  })
  const handleRegister = data => {
    console.log(data)
  }

  useEffect(() => {
    http.get('products').then(res => {
      console.log(res)
    })
  }, [])
  return (
    <div>
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
    </div>
  )
}
