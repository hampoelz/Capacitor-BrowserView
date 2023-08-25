import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'electron/build/electron/src/index.js',
    output: [
      {
        file: 'electron/dist/plugin.js',
        format: 'cjs',
        sourcemap: 'inline',
        inlineDynamicImports: true,
        exports: 'auto',
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
    plugins: [
      nodeResolve(),
      commonjs({
        ignoreDynamicRequires: true,
        dynamicRequireTargets: [
          'node_modules/capacitor-browserview/electron/dist/plugin.js',
        ],
      }),
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
        exports: 'default',
      },
    ],
    external: ['electron'],
    plugins: [
      nodeResolve(),
      commonjs({
        ignoreDynamicRequires: true,
        dynamicRequireTargets: [
          'node_modules/capacitor-browserview/electron/dist/bridge.js',
        ],
      }),
    ],
  },
];
