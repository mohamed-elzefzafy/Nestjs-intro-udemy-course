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
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
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
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-9996239192bafae2d9f1b96d28bc3b9be7a5458600b1eee6137642392b45973be7560de22cb3b45efd6ca21e0dd461726c58d309cb7063a0a169994c0538facf"' : 'data-bs-target="#xs-controllers-links-module-AppModule-9996239192bafae2d9f1b96d28bc3b9be7a5458600b1eee6137642392b45973be7560de22cb3b45efd6ca21e0dd461726c58d309cb7063a0a169994c0538facf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-9996239192bafae2d9f1b96d28bc3b9be7a5458600b1eee6137642392b45973be7560de22cb3b45efd6ca21e0dd461726c58d309cb7063a0a169994c0538facf"' :
                                            'id="xs-controllers-links-module-AppModule-9996239192bafae2d9f1b96d28bc3b9be7a5458600b1eee6137642392b45973be7560de22cb3b45efd6ca21e0dd461726c58d309cb7063a0a169994c0538facf"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-9996239192bafae2d9f1b96d28bc3b9be7a5458600b1eee6137642392b45973be7560de22cb3b45efd6ca21e0dd461726c58d309cb7063a0a169994c0538facf"' : 'data-bs-target="#xs-injectables-links-module-AppModule-9996239192bafae2d9f1b96d28bc3b9be7a5458600b1eee6137642392b45973be7560de22cb3b45efd6ca21e0dd461726c58d309cb7063a0a169994c0538facf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-9996239192bafae2d9f1b96d28bc3b9be7a5458600b1eee6137642392b45973be7560de22cb3b45efd6ca21e0dd461726c58d309cb7063a0a169994c0538facf"' :
                                        'id="xs-injectables-links-module-AppModule-9996239192bafae2d9f1b96d28bc3b9be7a5458600b1eee6137642392b45973be7560de22cb3b45efd6ca21e0dd461726c58d309cb7063a0a169994c0538facf"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-8cd7c36d88fc1bff69282b6d3cdef7700c16fabfd6172d6fd6bc62bd748a216d2ef5a23b81422306d01432ddda74328f729defca8bded533fa9c92077c663542"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-8cd7c36d88fc1bff69282b6d3cdef7700c16fabfd6172d6fd6bc62bd748a216d2ef5a23b81422306d01432ddda74328f729defca8bded533fa9c92077c663542"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-8cd7c36d88fc1bff69282b6d3cdef7700c16fabfd6172d6fd6bc62bd748a216d2ef5a23b81422306d01432ddda74328f729defca8bded533fa9c92077c663542"' :
                                            'id="xs-controllers-links-module-AuthModule-8cd7c36d88fc1bff69282b6d3cdef7700c16fabfd6172d6fd6bc62bd748a216d2ef5a23b81422306d01432ddda74328f729defca8bded533fa9c92077c663542"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-8cd7c36d88fc1bff69282b6d3cdef7700c16fabfd6172d6fd6bc62bd748a216d2ef5a23b81422306d01432ddda74328f729defca8bded533fa9c92077c663542"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-8cd7c36d88fc1bff69282b6d3cdef7700c16fabfd6172d6fd6bc62bd748a216d2ef5a23b81422306d01432ddda74328f729defca8bded533fa9c92077c663542"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-8cd7c36d88fc1bff69282b6d3cdef7700c16fabfd6172d6fd6bc62bd748a216d2ef5a23b81422306d01432ddda74328f729defca8bded533fa9c92077c663542"' :
                                        'id="xs-injectables-links-module-AuthModule-8cd7c36d88fc1bff69282b6d3cdef7700c16fabfd6172d6fd6bc62bd748a216d2ef5a23b81422306d01432ddda74328f729defca8bded533fa9c92077c663542"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-7d8fdaf0cfad3d852886c3022306b1abe0fa9026c6045bc65f018424179af617d1322ed48046e4295611b1a70e98d4efa097c5ed34afb9cd57539f25590ce5fd"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-7d8fdaf0cfad3d852886c3022306b1abe0fa9026c6045bc65f018424179af617d1322ed48046e4295611b1a70e98d4efa097c5ed34afb9cd57539f25590ce5fd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-7d8fdaf0cfad3d852886c3022306b1abe0fa9026c6045bc65f018424179af617d1322ed48046e4295611b1a70e98d4efa097c5ed34afb9cd57539f25590ce5fd"' :
                                            'id="xs-controllers-links-module-PostsModule-7d8fdaf0cfad3d852886c3022306b1abe0fa9026c6045bc65f018424179af617d1322ed48046e4295611b1a70e98d4efa097c5ed34afb9cd57539f25590ce5fd"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-7d8fdaf0cfad3d852886c3022306b1abe0fa9026c6045bc65f018424179af617d1322ed48046e4295611b1a70e98d4efa097c5ed34afb9cd57539f25590ce5fd"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-7d8fdaf0cfad3d852886c3022306b1abe0fa9026c6045bc65f018424179af617d1322ed48046e4295611b1a70e98d4efa097c5ed34afb9cd57539f25590ce5fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-7d8fdaf0cfad3d852886c3022306b1abe0fa9026c6045bc65f018424179af617d1322ed48046e4295611b1a70e98d4efa097c5ed34afb9cd57539f25590ce5fd"' :
                                        'id="xs-injectables-links-module-PostsModule-7d8fdaf0cfad3d852886c3022306b1abe0fa9026c6045bc65f018424179af617d1322ed48046e4295611b1a70e98d4efa097c5ed34afb9cd57539f25590ce5fd"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-e8aebd1db08def25bf992cf4dd164fec27a1069bd21cf42693111306c241a614007487a5d5d5c4c17a3103a3285a02243c1f2b7e4eaa0e2c70c68974220577a2"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-e8aebd1db08def25bf992cf4dd164fec27a1069bd21cf42693111306c241a614007487a5d5d5c4c17a3103a3285a02243c1f2b7e4eaa0e2c70c68974220577a2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-e8aebd1db08def25bf992cf4dd164fec27a1069bd21cf42693111306c241a614007487a5d5d5c4c17a3103a3285a02243c1f2b7e4eaa0e2c70c68974220577a2"' :
                                            'id="xs-controllers-links-module-UsersModule-e8aebd1db08def25bf992cf4dd164fec27a1069bd21cf42693111306c241a614007487a5d5d5c4c17a3103a3285a02243c1f2b7e4eaa0e2c70c68974220577a2"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-e8aebd1db08def25bf992cf4dd164fec27a1069bd21cf42693111306c241a614007487a5d5d5c4c17a3103a3285a02243c1f2b7e4eaa0e2c70c68974220577a2"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-e8aebd1db08def25bf992cf4dd164fec27a1069bd21cf42693111306c241a614007487a5d5d5c4c17a3103a3285a02243c1f2b7e4eaa0e2c70c68974220577a2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-e8aebd1db08def25bf992cf4dd164fec27a1069bd21cf42693111306c241a614007487a5d5d5c4c17a3103a3285a02243c1f2b7e4eaa0e2c70c68974220577a2"' :
                                        'id="xs-injectables-links-module-UsersModule-e8aebd1db08def25bf992cf4dd164fec27a1069bd21cf42693111306c241a614007487a5d5d5c4c17a3103a3285a02243c1f2b7e4eaa0e2c70c68974220577a2"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionDto.html" data-type="entity-link" >CreatePostMetaOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});