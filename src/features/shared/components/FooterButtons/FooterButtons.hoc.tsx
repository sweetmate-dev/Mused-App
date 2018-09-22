import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FooterButtons from './FooterButtons';
import { COLLECTION, BROWSE, FILTER } from '../../../shared';
import { ROOT_STORE } from '../../../stores';
type Props = {
    root?: RootStore;
};
function FooterButtonsHOC(FooterButtons: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { ui, products, slots } } = this.props;
          const { currentRoute }  = ui;
          const { createNewOutfit } = products;
          const { newImgUrl } = slots;
          const footerIsVisible = currentRoute === COLLECTION || currentRoute === BROWSE ||  currentRoute === FILTER;
        return (
            footerIsVisible &&  
            <FooterButtons 
              currentRoute={currentRoute}
              navigateToFilter={this._navigateToFilter}
              navigateToBrowse={this._navigateToBrowse}
              clearFilter={this._clearFilter}
              clearFilterAndGoToBrowse={this._clearFilterAndGoToBrowse}
              applyFilter={this._applyFilter}
              createNewOutfit={createNewOutfit}
              newImgUrl={newImgUrl}
            />
              )
      }
    _navigateToFilter = () => {
        const { root: { ui: { navigate } } } = this.props;
        navigate(FILTER, BROWSE);
    }
    _navigateToBrowse = () => {
      const { root: { ui: { navigate } } } = this.props;
      navigate(BROWSE, COLLECTION);
    }
    
    _clearFilter = () => {
      const { root: { filters: { clearFilters }  } } = this.props;
      clearFilters();
    }

    _clearFilterAndGoToBrowse = () => {
      this._navigateToBrowse();
      this._clearFilter();
    }

    _applyFilter = () => {
      const { root: { products: { getAlternativesByFilter }  } } = this.props;
      getAlternativesByFilter();
      this._navigateToBrowse();
    }
    }
    return NewComp;
  }

export default FooterButtonsHOC(FooterButtons);