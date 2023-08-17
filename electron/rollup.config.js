export default [
  {
    input: 'electron/build/electron/src/index.js',
    output: [
      {
        file: 'electron/dist/plugin.js',
        format: 'cjs',
        sourcemap: 'inline',
        inlineDynamicImports: true,
      },
    ],
    external: [
      '@capacitor/core',
      'electron',
      'crypto',
      'events',
      'http',
      'https',
      'path',
      'fs',
    ],
  },
  {
    input: 'electron/build/electron/src/bridge.js',
    output: [
      {
        file: 'electron/dist/bridge.js',
        format: 'cjs',
        sourcemap: 'inline',
        inlineDynamicImports: true,
      },
    ],
    external: ['electron'],
  },
];
