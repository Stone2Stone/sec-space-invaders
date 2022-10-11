import badLicenceSrc from '../img/bad-licence.png';
import IPosition from './interface/IPosition';
import Licence from './Licence';

class BadLicence extends Licence {
  constructor({ position }: IPosition) {
    super({ position }, badLicenceSrc);
  }
}

export default BadLicence;
