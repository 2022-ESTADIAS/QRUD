'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">qrud documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-eab489b5a03e4a0a8f22c6860815a7df012f9ac6f580e6fbdb53301bbb34fdcd8de21f71b3f9e0ef4c48c9e765ee6a2c4f2f6b71b3473a7c2aca8630e4bd08b6"' : 'data-target="#xs-components-links-module-AppModule-eab489b5a03e4a0a8f22c6860815a7df012f9ac6f580e6fbdb53301bbb34fdcd8de21f71b3f9e0ef4c48c9e765ee6a2c4f2f6b71b3473a7c2aca8630e4bd08b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-eab489b5a03e4a0a8f22c6860815a7df012f9ac6f580e6fbdb53301bbb34fdcd8de21f71b3f9e0ef4c48c9e765ee6a2c4f2f6b71b3473a7c2aca8630e4bd08b6"' :
                                            'id="xs-components-links-module-AppModule-eab489b5a03e4a0a8f22c6860815a7df012f9ac6f580e6fbdb53301bbb34fdcd8de21f71b3f9e0ef4c48c9e765ee6a2c4f2f6b71b3473a7c2aca8630e4bd08b6"' }>
                                            <li class="link">
                                                <a href="components/ContrasenaEmailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContrasenaEmailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PanelAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PanelAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RestablecerContrasenaEmailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RestablecerContrasenaEmailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentesModule.html" data-type="entity-link" >ComponentesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentesModule-24e95f4df4a500be065d5f4d43db34aa8150378edcda0699c1f270f0cb25e29e7a4456ebf0949286dc26b963b774b6d4e282cef2e9948b01a09b0412c7deb9a2"' : 'data-target="#xs-components-links-module-ComponentesModule-24e95f4df4a500be065d5f4d43db34aa8150378edcda0699c1f270f0cb25e29e7a4456ebf0949286dc26b963b774b6d4e282cef2e9948b01a09b0412c7deb9a2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentesModule-24e95f4df4a500be065d5f4d43db34aa8150378edcda0699c1f270f0cb25e29e7a4456ebf0949286dc26b963b774b6d4e282cef2e9948b01a09b0412c7deb9a2"' :
                                            'id="xs-components-links-module-ComponentesModule-24e95f4df4a500be065d5f4d43db34aa8150378edcda0699c1f270f0cb25e29e7a4456ebf0949286dc26b963b774b6d4e282cef2e9948b01a09b0412c7deb9a2"' }>
                                            <li class="link">
                                                <a href="components/ActualizarPersonalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActualizarPersonalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActualizarRolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActualizarRolComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActualizarUsuarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActualizarUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BuscadorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BuscadorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErroresBackendComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErroresBackendComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErroresFrontendComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErroresFrontendComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExitoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExitoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoEncontradoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoEncontradoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaginacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginacionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentesRoutingModule.html" data-type="entity-link" >ComponentesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PaginasModule.html" data-type="entity-link" >PaginasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PaginasModule-4556f5cae6de6054147083c11b30148d57e0749c17dcf82d81ef26ad4d202f9f3e71f3332792fb7cd95c0e9a2ab0b24150a5f64049076db5effd330941da3fda"' : 'data-target="#xs-components-links-module-PaginasModule-4556f5cae6de6054147083c11b30148d57e0749c17dcf82d81ef26ad4d202f9f3e71f3332792fb7cd95c0e9a2ab0b24150a5f64049076db5effd330941da3fda"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PaginasModule-4556f5cae6de6054147083c11b30148d57e0749c17dcf82d81ef26ad4d202f9f3e71f3332792fb7cd95c0e9a2ab0b24150a5f64049076db5effd330941da3fda"' :
                                            'id="xs-components-links-module-PaginasModule-4556f5cae6de6054147083c11b30148d57e0749c17dcf82d81ef26ad4d202f9f3e71f3332792fb7cd95c0e9a2ab0b24150a5f64049076db5effd330941da3fda"' }>
                                            <li class="link">
                                                <a href="components/CambioContrasenaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CambioContrasenaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EscannerQRComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EscannerQRComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PersonalEliminadoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonalEliminadoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroPersonalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistroPersonalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroRolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistroRolComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroUsuarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistroUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosEliminadosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosEliminadosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerPersonalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerPersonalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerRolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerRolComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerUsuariosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerUsuariosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PaginasModule-4556f5cae6de6054147083c11b30148d57e0749c17dcf82d81ef26ad4d202f9f3e71f3332792fb7cd95c0e9a2ab0b24150a5f64049076db5effd330941da3fda"' : 'data-target="#xs-pipes-links-module-PaginasModule-4556f5cae6de6054147083c11b30148d57e0749c17dcf82d81ef26ad4d202f9f3e71f3332792fb7cd95c0e9a2ab0b24150a5f64049076db5effd330941da3fda"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PaginasModule-4556f5cae6de6054147083c11b30148d57e0749c17dcf82d81ef26ad4d202f9f3e71f3332792fb7cd95c0e9a2ab0b24150a5f64049076db5effd330941da3fda"' :
                                            'id="xs-pipes-links-module-PaginasModule-4556f5cae6de6054147083c11b30148d57e0749c17dcf82d81ef26ad4d202f9f3e71f3332792fb7cd95c0e9a2ab0b24150a5f64049076db5effd330941da3fda"' }>
                                            <li class="link">
                                                <a href="pipes/BusquedaPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BusquedaPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginasRoutingModule.html" data-type="entity-link" >PaginasRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorServidorService.html" data-type="entity-link" >ErrorServidorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QRUDService.html" data-type="entity-link" >QRUDService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/EmailGuard.html" data-type="entity-link" >EmailGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ErrorServidorGuard.html" data-type="entity-link" >ErrorServidorGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/LoginResponse.html" data-type="entity-link" >LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Personal.html" data-type="entity-link" >Personal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonalLogin.html" data-type="entity-link" >PersonalLogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistroPersonal.html" data-type="entity-link" >RegistroPersonal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistroRol.html" data-type="entity-link" >RegistroRol</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistroUsuario.html" data-type="entity-link" >RegistroUsuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rol.html" data-type="entity-link" >Rol</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});