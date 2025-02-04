import RecipieDataService from '../../services/RecipieService';
import RecipeList from './RecipeList';
import FilterBox from './FilterBox';
import React, { Component } from 'react';
import { useMediaQuery } from 'react-responsive'

class All extends Component {
    state = {
        brands: [],
        recipies:[],
        selectedCheckboxes: new Set(),
        current_recipies: []
    };
    
    retrieveBrands = () => {
        RecipieDataService.getCategories()
            .then(response => {
                this.setState({ brands: response.data });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    retrieveRecipies = () => {
        RecipieDataService.getAll()
            .then(response => {
                this.setState({ recipies: response.data });
                this.setState({ current_recipies: response.data });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    componentDidMount() {
        this.retrieveBrands();
        this.retrieveRecipies();
        this.setState({ selectedCheckboxes: new Set() });
    }
    handleSelectBox = e => {
        const name = e.target.name;
        if (this.state.selectedCheckboxes.has(name)) {
            this.state.selectedCheckboxes.delete(name);
        } else {
            this.state.selectedCheckboxes.add(name);
        }
        this.setState({ selectedBoxes: this.state.selectedCheckboxes });
        if (this.state.selectedCheckboxes.size !== 0) {
            this.setRecipies();
        } else {
            this.setState({ current_recipies: this.state.recipies });
        }
    };
    setRecipies = () => {
       let temp=[]
       for (let item of this.state.selectedCheckboxes){
            for (let rec of this.state.recipies){
                if(rec.category.includes(item) && !temp.includes(rec)){
                    temp.push(rec)
                }
            }
       }
        this.setState({ current_recipies: temp });
    };
    Default = ({ children }) => {
        var  isNotMobile = useMediaQuery({ minWidth: 992 })
        return isNotMobile ? children : null
      }
    MobileorTablet = ({ children }) => {
        var isMobileorTablet = useMediaQuery({ maxWidth: 991 })
        return isMobileorTablet ? children : null
      }

    render() {
        return (
            <div
                className="container" 
                style={{ paddingTop: '2rem', paddingLeft: '0rem' }}
            >   <this.Default>
                <div className="row" style={{ marginLeft: '-5rem' }}>
                    <FilterBox id='categori_filter'
                        brands={this.state.brands}
                        handleSelectBox={this.handleSelectBox}
                    />
                    <RecipeList id='recipie_list'
                        recipies={this.state.current_recipies}
                    />
                </div>
                </this.Default>
                <this.MobileorTablet>
                <div className="row" style={{ marginLeft: '1rem' }}>
                    <FilterBox id='categori_filter'
                        brands={this.state.brands}
                        handleSelectBox={this.handleSelectBox}
                    />
                    <RecipeList id='recipie_list'
                        recipies={this.state.current_recipies}
                    />
                </div>
                </this.MobileorTablet>
            </div>
        );
    }
}

export default All;
