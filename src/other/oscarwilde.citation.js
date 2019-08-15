import _ from 'lodash';

const oscarCitations = [
  'La sottise est toujours une tentation irrésistible.',
  "Rien, si ne n'est l'âme, ne peut guérir les sens.",
  'Il ne faut rien faire avec précipitation.',
  'Spiritualiser son temps : certes, la tâche est enviable.',
  "Rien n'est jamais tout à fait vrai.",
  'Il ne faut jamais avoir de préjugés, ni juger les gens sans les connaître.',
  "On ne voit quelque chose que si l'on en voit la beauté.",
  'Pour être populaire, il faut être médiocre.',
];

export const getCitation = oscarCitations[_.random(0, oscarCitations.length - 1)];
