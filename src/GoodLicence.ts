import goodLicence from '../img/good-licence.png';
import IPosition from './interface/IPosition';
import Licence from './Licence';

class GoodLicence extends Licence {
  constructor({ position }: IPosition) {
    super({ position }, goodLicence);
  }
}

export default GoodLicence;
