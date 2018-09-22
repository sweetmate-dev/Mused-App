import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import FilterList from './FilterList';
import { Header } from '../../shared';
import { ROOT_STORE } from '../../stores';
type Props = {
    navigation: any;
    root: RootStore;
};
function FilterListHOC(FilterList: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
        return {
            header: <Header navigation={navigation} />
        } 
      };
      render() {
          const { root: { filters } } = this.props;
          const { listOfCategory, filterTab, setFilterTab} = filters;
        return <FilterList
                    listOfCategory={listOfCategory}
                    filterTab={filterTab}
                    setFilterTab={setFilterTab}
                />
      }
    }
    return NewComp;
  }

export default FilterListHOC(FilterList);