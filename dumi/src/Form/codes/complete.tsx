import {
  Form,
  Input,
  Radio,
  Select,
  RadioGroup,
  CheckBoxGroup,
  CheckBox,
  Switch,
  DatePicker,
  Row,
  Col,
  Button
} from 'tinkerbell-ui-react'
import React, { useState, useRef } from 'react'

const formComplete: React.FC = () => {
  const formRef: any = useRef(null)
  const [form, setForm] = useState({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '线上品牌商赞助',
    desc: ''
  })
  const rules = {
    name: [
      { required: true, message: '请填写年龄', trigger: 'blur' },
      {
        validator: (_rule: any, value: any, callback: any) => {
          var age = parseInt(form.name, 10)

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
    ],
    region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
    date1: [
      { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ],
    date2: [
      { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
    ],
    type: [
      {
        type: 'array',
        required: true,
        message: '请至少选择一个活动性质',
        trigger: 'change'
      }
    ],
    resource: [
      { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
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
        <Form.Item label='活动名称：' prop='name'>
          <Input
            value={form.name}
            onChange={(val: any) => {
              onChange('name', val)
            }}
          ></Input>
        </Form.Item>
        <Form.Item label='活动区域：' prop='region'>
          <Select
            value={form.region}
            filterable
            clearable={true}
            onChange={(val: any) => {
              console.log(val, 333)
              onChange('region', val)
            }}
            placeholder='请选择活动区域'
          >
            <Select.Option
              key='shanghai'
              label='区域一'
              value='shanghai'
            ></Select.Option>
            <Select.Option
              key='beijing'
              label='区域二'
              value='beijing'
            ></Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='活动时间：' required={true}>
          <Row>
            <Col span='11'>
              <Form.Item prop='date1' labelWidth='0px'>
                <DatePicker
                  size='mini'
                  type='dateTime'
                  defaultValue=''
                  value={form.date1}
                  onChange={(val: any) => {
                    onChange('date1', val)
                  }}
                ></DatePicker>
              </Form.Item>
            </Col>
            <Col className='line' span='2'>
              -
            </Col>
            <Col span='11'>
              <Form.Item prop='date2' labelWidth='0px'>
                <DatePicker
                  size='mini'
                  type='dateTime'
                  defaultValue=''
                  value={form.date2}
                  onChange={(val: any) => {
                    onChange('date2', val)
                  }}
                ></DatePicker>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label='即时配送：' prop='delivery'>
          <Switch
            onText=''
            offText=''
            value={form.delivery}
            onChange={(val: any) => {
              onChange('delivery', val)
            }}
          />
        </Form.Item>
        <Form.Item label='活动性质：' prop='type'>
          <CheckBoxGroup
            value={form.type}
            onChange={(val: any) => {
              onChange('type', val)
            }}
          >
            <CheckBox label='美食/餐厅线上活动' name='type'></CheckBox>
            <CheckBox label='地推活动' name='type'></CheckBox>
            <CheckBox label='线下主题活动' name='type'></CheckBox>
            <CheckBox label='单纯品牌曝光' name='type'></CheckBox>
          </CheckBoxGroup>
        </Form.Item>
        <Form.Item label='特殊资源：' prop='resource'>
          <RadioGroup
            value={form.resource}
            onChange={(val: any) => {
              console.log(val)
              onChange('resource', val)
            }}
          >
            <Radio value='线上品牌商赞助'></Radio>
            <Radio value='线下场地免费'></Radio>
          </RadioGroup>
        </Form.Item>
        <Form.Item label='活动形式：' prop='desc'>
          <Input
            type='textarea'
            value={form.desc}
            onChange={(val: any) => {
              onChange('desc', val)
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
