import { Form, Input, Radio } from 'tinkerbell-ui-react'
import React, { useState, useRef } from 'react'

const formPosition: React.FC = () => {
  const formRef: any = useRef(null)
  const [form, setForm] = useState({
    name: '',
    email: ''
  })
  const [labelPosition, setLabelPosition] = useState('left')
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
      <div style={{ marginBottom: 20 }}>
        <Radio.Group
          size='small'
          value={labelPosition}
          onChange={(val) => {
            setLabelPosition(val)
          }}
        >
          <Radio.Button value='left'>左对齐</Radio.Button>
          <Radio.Button value='right'>右对齐</Radio.Button>
          <Radio.Button value='top'>顶部对齐</Radio.Button>
        </Radio.Group>
      </div>

      <Form
        labelPosition={labelPosition}
        rules={rules}
        model={form}
        ref={formRef}
        labelWidth='80'
      >
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

export default formPosition
