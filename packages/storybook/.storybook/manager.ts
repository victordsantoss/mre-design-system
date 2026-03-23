import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

const mreTheme = create({
  base: 'light',
  brandTitle: 'Ministério das Relações Exteriores',
  brandUrl: 'https://www.gov.br/mre/pt-br',
  brandTarget: '_blank',
  brandImage: undefined,
  colorPrimary: '#071D41',
  colorSecondary: '#1351B4',
  appBg: '#F8F8F8',
  appContentBg: '#FFFFFF',
  barBg: '#071D41',
  barTextColor: '#F8F8F8',
  barSelectedColor: '#C5D4EB',
  barHoverColor: '#98BAE7',
  inputBg: '#FFFFFF',
  inputBorder: '#DCDCDC',
  inputTextColor: '#333333',
  textColor: '#333333',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#666666',
})

addons.setConfig({
  theme: mreTheme,
  sidebar: {
    showRoots: true,
  },
})
