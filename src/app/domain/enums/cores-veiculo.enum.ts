export interface ColorOption {
  nome: string;
  cor: string;
}

export const optionsCoresVeiculos: ColorOption[] = [
  { nome: 'AMARELA', cor: '#FFFF00' },
  { nome: 'AZUL', cor: '#0090FF' },
  { nome: 'BEGE', cor: '#F5F5DC' },
  { nome: 'BRANCA', cor: '#FFFFFF' },
  { nome: 'CINZA', cor: '#909090' },
  { nome: 'DOURADA', cor: '#DAA520' },
  { nome: 'GRENA', cor: '#800020' },
  { nome: 'LARANJA', cor: '#FFA500' },
  { nome: 'MARROM', cor: '#964B00' },
  { nome: 'PRATA', cor: '#C0C0C0' },
  { nome: 'PRETA', cor: '#000000' },
  { nome: 'ROSA', cor: '#FFC0CB' },
  { nome: 'ROXA', cor: '#FF00FF' },
  { nome: 'VERDE', cor: '#008000' },
  { nome: 'VERMELHA', cor: '#FF0000' },
  { nome: 'FANTASIA', cor: '#FF69B4' },
];

export enum CoresVeiculosEnum {
  Amarela = 'AMARELA',
  Azul = 'AZUL',
  Bege = 'BEGE',
  Branca = 'BRANCA',
  Cinza = 'CINZA',
  Dourada = 'DOURADA',
  Grena = 'GRENA',
  Laranja = 'LARANJA',
  Marrom = 'MARROM',
  Prata = 'PRATA',
  Preto = 'PRETO',
  Rosa = 'ROSA',
  Roxa = 'ROXA',
  Verde = 'VERDE',
  Vermelha = 'VERMELHA',
  Fantasia = 'FANTASIA',
}