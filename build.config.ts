import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/validate',
    'src/authority',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
