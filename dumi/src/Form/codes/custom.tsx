import {
  Form,
  Input,
  Button
} from 'tinkerbell-ui-react'
import React, { useState, useRef } from 'react'

const formComplete: React.FC = () => {
  const formRef: any = useRef(null)
  const [form, setForm] = useState({
    pass: '',
    checkPass: '',
    age: ''
  })
  const rules = {
    pass: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'))
          } else {
            if (form.checkPass !== '') {
              formRef.current.validateField('checkPass')
            }
            callback()
          }
        }
      }
    ],
    checkPass: [
      { required: true, message: '请再次输入密码', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== form.pass) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        }
      }
    ],
    age: [
      { required: true, message: '请填写年龄', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          var age = parseInt(value, 10)

          setTimeout(() => {
            if (!Number.isInteger(age)) {
              callback(new Error('请输入数字值'))
            } else {
              if (age < 18) {
                callback(new Error('必须年满18岁'))
              } else {
                callback()
              }
            }
          }, 1000)
        },
        trigger: 'change'
      }
    ]
  }
  function handleSubmit(e) {
    e.preventDefault()

    formRef.current.validate((valid) => {
      if (valid) {
        alert('submit!')
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  function handleReset(e) {
    e.preventDefault()

    formRef.current.resetFields()
  }

  function onChange(key: any, value: any) {
    console.log(form)
    setForm({ ...form, [key]: value })
  }
  return (
    <>
      <Form rules={rules} model={form} ref={formRef} labelWidth='100'>
        <Form.Item label='密码：' prop='pass'>
          <Input
            type='password'
            value={form.pass}
            onChange={(val: any) => {
              onChange('pass', val)
            }}
            autoComplete='off'
          />
        </Form.Item>
        <Form.Item label='确认密码：' prop='checkPass'>
          <Input
            type='password'
            value={form.checkPass}
            onChange={(val: any) => {
              onChange('checkPass', val)
            }}
            autoComplete='off'
          />
        </Form.Item>
        <Form.Item label='年龄：' prop='age'>
          <Input
            value={form.age}
            onChange={(val: any) => {
              onChange('age', val)
            }}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={handleSubmit}>
            立即创建
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default formComplete
