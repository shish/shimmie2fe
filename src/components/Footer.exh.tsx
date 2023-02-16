// src/button.exh.ts (or .js, .jsx, .tsx, ...)
import exhibit from 'exhibitor'
import { Footer } from './Footer' // I.e. button.tsx

exhibit(Footer, 'Footer')
  // Define any default values for props
  .defaults({
    onClick: () => undefined,
    color: 'default',
  })
  // Define which props correspond to events of the component
  .events({ onClick: true })
  // Define miscellaneous options
  .options({ group: 'Final Review' })
  // Define variants with varying prop values
  .variant('Green', defaultProps => ({
    ...defaultProps,
    color: 'green',
  }))
  // Group variants together
  .group('Large', ex => ex
    .defaults(p => ({
      ...p,
      size: 'large'
    }))
    .variant('Green', p => ({
      ...p,
      color: 'green'
    })))
  .build()