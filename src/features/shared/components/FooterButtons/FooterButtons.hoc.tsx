import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FooterButtons from './FooterButtons';
import { COLLECTION, BROWSE, VIDEOPLAYER, FILTER, VIEW, NEWSFEED, BROWSE_ONLY } from '../../../shared';
import { ROOT_STORE } from '../../../stores';
import * as API from '../../../../services/api';

type Props = {
    root?: RootStore;
};
function FooterButtonsHOC(FooterButtons: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      render() {
          const { root: { ui, slots, user } } = this.props;
          const { currentRoute }  = ui;
          const { newImgUrl } = slots;
          const footerIsVisible = 
            currentRoute === COLLECTION || currentRoute === VIDEOPLAYER || currentRoute === BROWSE ||  currentRoute === FILTER || currentRoute === VIEW;
        return (
            footerIsVisible &&  
            <FooterButtons 
              currentRoute={currentRoute}
              navigateToFilter={this._navigateToFilter}
              navigateBackToBrowse={this._navigateBackToBrowse}
              navigateToView={this._navigateToView}
              clearFilterAndGoToBrowse={this._clearFilterAndGoToBrowse}
              applyFilter={this._applyFilter}
              createNewOutfit={this._createNewOutfit}
              openProductCategory={this._openProductCategory}
              newImgUrl={newImgUrl}
              user={user}
            />
              )
    }

    _openProductCategory = () => {
      const { root: { products } } = this.props;
      const { openProductCategory } = products;
      API.RegisterEvent("Vw-footerFilter", {
        actionType: "Click menu 'Filter'"
      })
      openProductCategory();
    }

    _navigateBackToBrowse = () => {
      API.RegisterEvent("Vw-footerView", {
        actionType: "Click menu 'View'"
      })
      this._navigateToBrowse();
    }

    _createNewOutfit = () => {
      const { root: { ui, products } } = this.props;
      const { currentRoute }  = ui;
      const { createNewOutfit } = products;
      if(currentRoute === COLLECTION) {
        API.RegisterEvent("Cl-loveit", {
          actionType: "Click on 'Love it' in footer"
        })
      } else {
        API.RegisterEvent("Br-footerLove", {
          actionType: "Click menu 'Love it'"
        })
      }      
      createNewOutfit();
    }

    _navigateToFilter = () => {
        const { root: { ui: { navigate }, products } } = this.props;
        const { setBrowseType } = products;
        API.RegisterEvent("Br-footerFilter", {
          actionType: "Click menu 'Filter'"
        })
        setBrowseType(1);
        navigate(FILTER, BROWSE);
    }

    _navigateToView = () => {
      const { root: { ui: { navigate } } } = this.props;
      API.RegisterEvent("Br-footerView", {
        actionType: "Click menu 'View'"
      })
      navigate(VIEW, BROWSE);
    }

    _navigateToBrowse = () => {
      const { root: { ui: { navigate }, products } } = this.props;
      const { fromMenu } = products;
      if(fromMenu) navigate(BROWSE_ONLY, COLLECTION);
      else navigate(BROWSE, COLLECTION);
    }

    _clearFilterAndGoToBrowse = () => {
      const { root: { filters, products, slots, ui } } = this.props;
      const { clearFilters, setFilterTab } = filters;
      const { cancelNewSlot, arrayImages } = products;
      const { setPrevSlotNumber } = slots;
      const { prevRoute, navigate } = ui;

      if(prevRoute === COLLECTION) navigate(COLLECTION, NEWSFEED);
      else this._navigateToBrowse();      
      clearFilters();
      setPrevSlotNumber(arrayImages);
      cancelNewSlot();
      API.RegisterEvent("Fi-cancel", {
        actionType: "Click 'cancel'"
      })
      setFilterTab('applied')
    }

    _applyFilter = async () => {
      const { root: { products: { getAlternativesByFilter }, filters  } } = this.props;
      const { setFilterTab } = filters;
      await getAlternativesByFilter();
      API.RegisterEvent("Fi-apply", {
        actionType: "Click 'apply'"
      })
      setFilterTab('applied');
      setTimeout(() => {
        this._navigateToBrowse();
      }, 500)      
    }
    }
    return NewComp;
  }

export default FooterButtonsHOC(FooterButtons);