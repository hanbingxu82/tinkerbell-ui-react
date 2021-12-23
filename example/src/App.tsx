/*
 * @Author: your name
 * @Date: 2021-12-13 14:52:54
 * @LastEditTime: 2021-12-23 11:10:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hxreact/example/src/App.tsx
 */
import React, { useState } from 'react'

import { ExampleComponent, Button, Icon, Link } from 'hxreact'
import 'hxreact/dist/index.css'

const App = () => {
  const [loading, setLoading] = useState(false)
  return (
    <div>
      <ExampleComponent text='我是一个小仙男' />
      <Button loading={loading}>default</Button>
      <Button icon={'icon-Color-fill'}>default</Button>
      <Button
        type='primary'
        loading={loading}
        onClick={() => {
          setLoading(true)
        }}
      >
        Click me!
      </Button>
      <Icon name={'icon-Color-fill'} />
      <div>
        <Link href='/' target='_blank'>
          默认链接
        </Link>
        <Link type='primary'>主要链接</Link>
        <Link type='success'>成功链接</Link>
        <Link type='warning'>警告链接</Link>
        <Link type='danger'>危险链接</Link>
        <Link type='info'>信息链接</Link>
      </div>
      <div>
        <Link disabled>默认链接</Link>
        <Link type='primary' disabled>
          主要链接
        </Link>
        <Link type='success' disabled>
          成功链接
        </Link>
        <Link type='warning' disabled>
          警告链接
        </Link>
        <Link type='danger' disabled>
          危险链接
        </Link>
        <Link type='info' disabled>
          信息链接
        </Link>
      </div>
      <div>
        <Link underline={false}>无下划线</Link>
        <Link>有下划线</Link>
      </div>
      <div>
        <Link icon='icon-browse'>编辑</Link>
        <Link>
          查看<i className='iconfont icon-browse'></i>
        </Link>
      </div>
    </div>
  )
}

export default App
