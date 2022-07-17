import Prism from 'prismjs';
import 'prismjs/plugins/custom-class/prism-custom-class.min';

import tokenClasnames from './mapPrismDefaultClassnames.module.scss';

Prism.plugins.customClass.map({...tokenClasnames})
