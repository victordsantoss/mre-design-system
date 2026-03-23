/**
 * Especificação visual Gov.br — leitura e fundos (documento oficial).
 *
 * - **Leitura:** cor principal (P) para texto em fundo claro (#333333, `--gray-80`) e em fundo escuro (#ffffff, `--pure-0`).
 * - **Fundo claro:** P = #ffffff (`--pure-0`), A = #f8f8f8 (`--gray-2`).
 * - **Fundo escuro:** P = #071D41 (`--blue-warm-vivid-90`), A = #0C326F (`--blue-warm-vivid-80`).
 *
 * Demais cores de marca (primária, feedback etc.) permanecem em `semantic/colors.ts`.
 */
import { blueWarmVivid, gray, pure } from '../primitives/colors'

export const govEspecificacao = {
  leitura: {
    /** FUNDO CLARO PARA LEITURA — P */
    fundoClaro: { hex: gray[80], token: '--gray-80' as const },
    /** FUNDO ESCURO PARA LEITURA — P */
    fundoEscuro: { hex: pure[0], token: '--pure-0' as const },
  },
  fundoClaro: {
    /** P — cor principal */
    principal: { hex: pure[0], token: '--pure-0' as const },
    /** A — cor alternativa */
    alternativo: { hex: gray[2], token: '--gray-2' as const },
  },
  fundoEscuro: {
    /** P — cor principal */
    principal: { hex: blueWarmVivid[90], token: '--blue-warm-vivid-90' as const },
    /** A — cor alternativa */
    alternativo: { hex: blueWarmVivid[80], token: '--blue-warm-vivid-80' as const },
  },
} as const
