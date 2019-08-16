import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { get as _get } from 'lodash';
import defaultImagePlaceholder from '../../static/img/blog-card/default-placeholder.jpg';
import informatiqueImagePlaceholder from '../../static/img/blog-card/informatique.jpg';
import spaceImagePlaceholder from '../../static/img/blog-card/sapce-placeholder-3.jpg';
import spaceImagePlaceholderHero from '../../static/img/blog-card/hero-image-space-min.png';
import devImagePlaceholderHero from '../../static/img/blog-card/hero-image-dev.png';
import scienceImagePlaceholderHero from '../../static/img/blog-card/hero-image-sciences.png';

export const formatDate = (date) => dayjs(date)
  .locale('fr')
  .format('D MMM YYYY');

export const blogCardImagePlaceholder = (category, image) => {
  if (image) {
    return _get(image, ['childImageSharp', 'fluid', 'src']);
  }
  const matching = {
    developpement: informatiqueImagePlaceholder,
    espace: spaceImagePlaceholder,
  };

  const matchingResult = _get(matching, category);
  if (matchingResult) {
    return matchingResult;
  }

  return defaultImagePlaceholder;
};

export const blogHeroImagePlaceholder = (category) => {
  const matching = {
    developpement: devImagePlaceholderHero,
    espace: spaceImagePlaceholderHero,
    science: scienceImagePlaceholderHero,
  };

  const matchingResult = _get(matching, category);
  if (matchingResult) {
    return matchingResult;
  }

  return false;
};
