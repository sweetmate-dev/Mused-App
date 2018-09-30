import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Header from './Header';

import { ROOT_STORE } from '../../../stores';

type Props = {
    navigation: any;
    root?: RootStore;
    showContent?: boolean;
};
function HeaderHOC(Header: any) {
    @inject(ROOT_STORE)

    @observer
    class NewComp extends Component<Props> {
        render() {
            const { navigation, showContent,  root: { ui, user, products, filters } } = this.props;
            const { setPrevCurrentRoutes, currentRoute, prevRoute } = ui;
            const { userProfile, logout } = user;
            const { resetArrayImages, resetAlternativies } = products;
            const { filterTab, clearFilters } = filters;

            return <Header
                    setPrevCurrentRoutes={setPrevCurrentRoutes}
                    navigation={navigation}
                    showContent={showContent}
                    userProfile={userProfile}
                    logout={logout}
                    currentRoute={currentRoute}
                    hideContextMenu={this._hideContextMenu}
                    resetArrayImages={resetArrayImages}
                    filterTab={filterTab}
                    backToFilterTabs={this._setFilterTab}
                    clearFilters={clearFilters}
                    resetAlternativies={resetAlternativies}
                    prevRoute={prevRoute}
            />
        }
        _hideContextMenu = () => {
            const {   root: { ui: { toggleContextMenu } } } = this.props;
            toggleContextMenu(false);
        }

        _setFilterTab = () => {
            const { root: { filters: {setFilterTab} } } = this.props;
            setFilterTab('')
        }
    }
    return NewComp;
  }

export default HeaderHOC(Header);
