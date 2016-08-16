// Third party libs
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/Rx'; // get everything from Rx (overkill replace with barrel)
// My app
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
