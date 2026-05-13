import ModernDark from './templates/ModernDark'
import BrightSeasonal from './templates/BrightSeasonal'
import BoldDramatic from './templates/BoldDramatic'
import CleanMinimal from './templates/CleanMinimal'
import RetroFun from './templates/RetroFun'
import NavyCorporate from './templates/NavyCorporate'
import EmojiClassic from './templates/EmojiClassic'
import PartyAnimals from './templates/PartyAnimals'
import CakeExplosion from './templates/CakeExplosion'
import RetroArcade from './templates/RetroArcade'
import {
  ThumbModernDark, ThumbBrightSeasonal, ThumbBoldDramatic, ThumbCleanMinimal,
  ThumbRetroFun, ThumbNavyCorporate, ThumbEmojiClassic,
  ThumbPartyAnimals, ThumbCakeExplosion, ThumbRetroArcade,
} from './Thumbnails'

export const TEMPLATES = {
  modern: {
    id: 'modern',
    label: 'Modern Dark',
    description: 'Sleek purple with spotlight',
    Thumb: ThumbModernDark,
    component: ModernDark,
  },
  seasonal: {
    id: 'seasonal',
    label: 'Bright Seasonal',
    description: 'Vibrant monthly color themes',
    Thumb: ThumbBrightSeasonal,
    component: BrightSeasonal,
  },
  bold: {
    id: 'bold',
    label: 'Bold & Dramatic',
    description: 'High contrast, striking type',
    Thumb: ThumbBoldDramatic,
    component: BoldDramatic,
  },
  minimal: {
    id: 'minimal',
    label: 'Clean Minimal',
    description: 'Simple and professional',
    Thumb: ThumbCleanMinimal,
    component: CleanMinimal,
  },
  retro: {
    id: 'retro',
    label: 'Retro Fun',
    description: 'Colorful and energetic',
    Thumb: ThumbRetroFun,
    component: RetroFun,
  },
  corporate: {
    id: 'corporate',
    label: 'Navy Corporate',
    description: 'Professional and formal',
    Thumb: ThumbNavyCorporate,
    component: NavyCorporate,
  },
  emoji: {
    id: 'emoji',
    label: 'Emoji Classic',
    description: 'Original fun emoji style',
    Thumb: ThumbEmojiClassic,
    component: EmojiClassic,
  },
  partyanimals: {
    id: 'partyanimals',
    label: 'Party Animals',
    description: 'Cartoon animals celebrate with you',
    Thumb: ThumbPartyAnimals,
    component: PartyAnimals,
  },
  cakeexplosion: {
    id: 'cakeexplosion',
    label: 'Cake Explosion',
    description: 'Dramatic dark photo background',
    Thumb: ThumbCakeExplosion,
    component: CakeExplosion,
  },
  retroarcade: {
    id: 'retroarcade',
    label: 'Retro Arcade',
    description: 'Level up! 8-bit party vibes',
    Thumb: ThumbRetroArcade,
    component: RetroArcade,
  },
}

export const DEFAULT_TEMPLATE = 'modern'
