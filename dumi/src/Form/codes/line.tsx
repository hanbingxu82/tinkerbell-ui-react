import { Form, Input } from 'tinkerbell-ui-react'
import React, { useState, useRef } from 'react'

const formLine: React.FC = () => {
  const formRef: any = useRef(null)
  const [form, setForm] = useState({
    name: '',
    email: ''
  })
  const rules = {
    name: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }]
  }
  function onChange(key: any, value: any) {
    setForm({
      ...form,
      [key]: value
    })
  }
  return (
    <>
      <Form rules={rules} model={form} ref={formRef} labelWidth='80'>
        <Form.Item prop='name' label='用户名：'>
          <Input
            value={form.name}
            onChange={(val: any) => {
              onChange('name', val)
            }}
            placeholder='请输入用户名'
          ></Input>
        </Form.Item>
        <Form.Item prop='email' label='邮箱：'>
          <Input
            onChange={(val: any) => {
              onChange('email', val)
            }}
            placeholder='请输入邮箱'
          ></Input>
        </Form.Item>
      </Form>
    </>
  )
}

export default formLine
