import React from 'react'
import ReactDOM from 'react-dom'

function mount () {
  const element = document.querySelector('[data-app]') as HTMLElement
  if (!element) return

  Promise.all([
    import('./App'),
    import('./registerServiceWorker')
  ])
    .then(([{ App }]) => {
      const props = element.dataset || {}
      const component = React.createElement(App, props)
      ReactDOM.render(component, element)
    })
}

mount()
