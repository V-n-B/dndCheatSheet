
import { getKnexConnection } from './getKnexConnection';
import { configureContainerBindings } from './utils/configureContainerBindings';
import { container } from './utils/dependencyInjection';
import { initGlobal } from './utils/globalTypedKnex';

const database = getKnexConnection();
initGlobal(database);
configureContainerBindings(container, database);


import { WebServer } from './WebServer';

const webserver = container.get(WebServer);
webserver.start();
