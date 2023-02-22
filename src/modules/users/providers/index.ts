import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import CryptrHashProvider from './HashProvider/implementations/CryptrHashProvider';

container.registerSingleton<IHashProvider>('BCryptHashProvider', BCryptHashProvider);
container.registerSingleton<IHashProvider>('CryptrHashProvider', CryptrHashProvider);
