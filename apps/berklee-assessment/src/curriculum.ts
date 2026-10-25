export type SkillArea = {
  name: string
  summary: string
  resource?: string
  resourceLabel?: string
}

export type Level = {
  number: number
  focus: string
  description: string
  skills: SkillArea[]
  sample: string
}

const requirementsPath = 'docs/Berklee-Exam-Requirements/'

const resource = (file: string, label: string) => ({
  resource: `${requirementsPath}${file}`,
  resourceLabel: label,
})

export const levels: Level[] = [
  {
    number: 1,
    focus: 'Major',
    description: 'Major scales and foundational chord work.',
    sample: 'level1samples.pdf',
    skills: [
      { name: 'Scales & modes', summary: 'Major scales and modes', ...resource('l1s1.pdf', 'Level 1 scale forms') },
      { name: 'Symmetric scales', summary: 'Chromatic, whole tone, and diminished scales', ...resource('sym_scales.pdf', 'Symmetric scale forms') },
      { name: 'Pentatonic scales', summary: 'Pentatonic scale forms', ...resource('pent_scales.pdf', 'Pentatonic scale forms') },
      { name: 'Chord forms', summary: 'Four-part chords and triad forms', ...resource('Level 1_3_fourpart.pdf', 'Level 1 four-part forms') },
      { name: 'Triad forms', summary: 'Level 1 triad forms', ...resource('triad_chrdsl2.pdf', 'Level 1 and 2 triad forms') },
      { name: 'Triad arpeggios', summary: 'Triad arpeggio forms', ...resource('triad_arps.pdf', 'Triad arpeggios') },
      { name: 'Four-part arpeggios', summary: 'Four-part arpeggio forms', ...resource('4part_arps.pdf', 'Four-part arpeggios') },
    ],
  },
  {
    number: 2,
    focus: 'Melodic minor',
    description: 'Melodic minor scales and foundational chord work.',
    sample: 'level2samples.pdf',
    skills: [
      { name: 'Scales & modes', summary: 'Melodic minor scales and modes', ...resource('l2s1.pdf', 'Level 2 scale forms') },
      { name: 'Symmetric scales', summary: 'Chromatic, whole tone, and diminished scales', ...resource('sym_scales.pdf', 'Symmetric scale forms') },
      { name: 'Pentatonic scales', summary: 'Pentatonic scale forms', ...resource('pent_scales.pdf', 'Pentatonic scale forms') },
      { name: 'Chord forms', summary: 'Four-part chords and triad forms', ...resource('Level 2_4_fourpart.pdf', 'Level 2 four-part forms') },
      { name: 'Triad forms', summary: 'Level 2 triad forms', ...resource('triad_chrdsl2.pdf', 'Level 1 and 2 triad forms') },
      { name: 'Triad arpeggios', summary: 'Triad arpeggio forms', ...resource('triad_arps.pdf', 'Triad arpeggios') },
      { name: 'Four-part arpeggios', summary: 'Four-part arpeggio forms', ...resource('4part_arps.pdf', 'Four-part arpeggios') },
    ],
  },
  {
    number: 3,
    focus: 'Harmonic minor',
    description: 'Harmonic minor scales and expanded triad forms.',
    sample: 'level3samples.pdf',
    skills: [
      { name: 'Scales & modes', summary: 'Harmonic minor scales and modes', ...resource('l3s1%20.pdf', 'Level 3 scale forms') },
      { name: 'Symmetric scales', summary: 'Chromatic, whole tone, and diminished scales', ...resource('sym_scales.pdf', 'Symmetric scale forms') },
      { name: 'Pentatonic scales', summary: 'Pentatonic scale forms', ...resource('pent_scales.pdf', 'Pentatonic scale forms') },
      { name: 'Chord forms', summary: 'Level 3 four-part chord forms', ...resource('Level 1_3_fourpart.pdf', 'Level 1 and 3 four-part forms') },
      { name: 'Spread triads', summary: 'Level 3 spread triad forms', ...resource('sprds_l3and4.pdf', 'Level 3 and 4 spread triads') },
      { name: 'Triad arpeggios', summary: 'Triad arpeggio forms', ...resource('triad_arps.pdf', 'Triad arpeggios') },
      { name: 'Four-part arpeggios', summary: 'Four-part arpeggio forms', ...resource('4part_arps.pdf', 'Four-part arpeggios') },
    ],
  },
  {
    number: 4,
    focus: 'Harmonic major',
    description: 'Harmonic major scales and expanded triad forms.',
    sample: 'level4samples.pdf',
    skills: [
      { name: 'Scales & modes', summary: 'Harmonic major scales and modes', ...resource('l4s1.pdf', 'Level 4 scale forms') },
      { name: 'Chord forms', summary: 'Level 4 four-part chord forms', ...resource('Level 2_4_fourpart.pdf', 'Level 2 and 4 four-part forms') },
      { name: 'Spread triads', summary: 'Level 4 spread triad forms', ...resource('sprds_l3and4.pdf', 'Level 3 and 4 spread triads') },
      { name: 'Triad arpeggios', summary: 'Triad arpeggio forms', ...resource('triad_arps.pdf', 'Triad arpeggios') },
      { name: 'Four-part arpeggios', summary: 'Four-part arpeggio forms', ...resource('4part_arps.pdf', 'Four-part arpeggios') },
    ],
  },
  {
    number: 5,
    focus: 'Major · 3 octaves',
    description: 'Three-octave major scale forms and triad cycles.',
    sample: 'level5samples.pdf',
    skills: [
      { name: 'Scales & modes', summary: 'Major scales and modes in three octaves', ...resource('L5_three_octave_modes.pdf', 'Level 5 scale forms') },
      { name: 'Triad cycles', summary: 'Triad cycles diatonic to major', ...resource('level5_maj_cyc.mus.pdf', 'Level 5 triad cycles') },
    ],
  },
  {
    number: 6,
    focus: 'Melodic minor · 3 octaves',
    description: 'Three-octave melodic minor scale forms and triad cycles.',
    sample: 'level6samples.pdf',
    skills: [
      { name: 'Scales & modes', summary: 'Melodic minor scales and modes in three octaves', ...resource('L6_three_octave_modes.pdf', 'Level 6 scale forms') },
      { name: 'Triad cycles', summary: 'Triad cycles diatonic to melodic minor', ...resource('level6_melm_cyc.mus.pdf', 'Level 6 triad cycles') },
    ],
  },
  {
    number: 7,
    focus: 'Harmonic minor · 3 octaves',
    description: 'Three-octave harmonic minor scale forms and triad cycles.',
    sample: 'level7samples.pdf',
    skills: [
      { name: 'Scales & modes', summary: 'Harmonic minor scales and modes in three octaves', ...resource('L7_three_octave_modes.pdf', 'Level 7 scale forms') },
      { name: 'Triad cycles', summary: 'Triad cycles diatonic to harmonic minor', ...resource('level_7_HM_cyc.mus.pdf', 'Level 7 triad cycles') },
    ],
  },
  {
    number: 8,
    focus: 'Harmonic major · 3 octaves',
    description: 'Three-octave harmonic major scale forms and triad voicings.',
    sample: 'level8samples.pdf',
    skills: [
      { name: 'Scales & modes', summary: 'Harmonic major scales and modes in three octaves', ...resource('L8_three_octave_modes.pdf', 'Level 8 scale forms') },
      { name: 'Triad voicings', summary: '“48 to 48” triad voicings: from any triad to any triad, in all keys', ...resource('lvl_8_triad_rows.pdf', 'Level 8 triad voicings') },
    ],
  },
]

export function getLevel(number: number): Level {
  const level = levels.find((item) => item.number === number)
  if (!level) {
    throw new Error(`Unknown proficiency level: ${number}`)
  }
  return level
}
