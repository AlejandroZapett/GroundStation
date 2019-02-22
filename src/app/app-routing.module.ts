import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GsMainWrapperComponentComponent } from './components/gs-main-wrapper-component/gs-main-wrapper-component.component';
import { GsPresentationComponentComponent } from './components/gs-presentation-component/gs-presentation-component.component';
import { GsTestsComponentComponent } from './components/menu-options/gs-tests-component/gs-tests-component.component';
import { GsGeneralMenuComponentComponent } from './components/menu-options/gs-general-menu-component/gs-general-menu-component.component';

const routes: Routes = [
    {
        path: '',
        component: GsPresentationComponentComponent
    },
    {
        path: 'general-menu',
        component: GsMainWrapperComponentComponent,
        children: [
            {path: 'tests', component: GsTestsComponentComponent},
            {path: 'menu', component: GsGeneralMenuComponentComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
