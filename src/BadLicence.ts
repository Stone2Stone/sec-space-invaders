import badLicenceSrc from '../img/bad-licence.png';
import { canvas } from './Canvas';
import IPosition from './interface/IPosition';
import InvaderProjectile from './InvaderProjectile';
import Licence from './Licence';

class BadLicence extends Licence {
  constructor({ position }: IPosition) {
    super({ position }, badLicenceSrc);
  }
}

export default BadLicence;
