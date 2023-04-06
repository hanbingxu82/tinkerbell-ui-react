import { Tabs, Icon } from 'tinkerbell-ui-react'
import React, { useState } from 'react'

const App: React.FC = () => {
  const [tabs, setTabs] = useState([
    {
      title: 'Tab 1',
      name: 'Tab 1',
      content: 'Tab 1 content'
    },
    {
      title: 'Tab 2',
      name: 'Tab 2',
      content: 'Tab 2 content'
    }
  ])
  const [tabIndex, setTabIndex] = useState(2)

  function editTab(action, tab) {
    if (action === 'add') {
      const index = tabIndex + 1

      tabs.push({
        title: 'new Tab',
        name: 'Tab ' + index,
        content: 'new Tab content'
      })
      const arr = [...tabs]
      setTabs([...tabs])
      setTabIndex(index)
    }

    if (action === 'remove') {
      tabs.splice(tab.key.replace(/^\.\$/, ''), 1)
      setTabs([...tabs])
      // setTabIndex(tabs.length - 1)
    }
  }

  return (
    <>
      <Tabs
        type='card'
        value='Tab 2'
        editable
        onTabEdit={(action, tab) => editTab(action, tab)}
      >
        {tabs.map((item, index) => {
          return (
            <Tabs.Pane key={index} closable label={item.title} name={item.name}>
              {item.content}
            </Tabs.Pane>
          )
        })}
      </Tabs>
    </>
  )
}

export default App
