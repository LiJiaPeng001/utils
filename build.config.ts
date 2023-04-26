import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/validate',
    'src/authority',
    'src/index',
    'src/image',
    'src/upload',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
