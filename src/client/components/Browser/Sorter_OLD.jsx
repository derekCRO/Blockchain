import React, { Component } from 'react';
import * as actions from '../../redux/actions/sortActions.js';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import PaginationField from './PaginationField';
import SorterForm from './SorterForm';
import selectForm from './selectForm';

class Sorter extends Component {
  constructor() {
    super();
    this.state = {
      selectedField: '',
    };
  }

  componentDidMount() {
    // this.props.fetchOffers();
    if (this.props.browserFilter === 'SHOW_MAP') {
      this.props.fetchOffers();
    }
    
  }

  componentWillReceiveProps(nxtProps) {
    this.props.newItems(nxtProps.itemSorted);
    if (nxtProps.browserFilter === 'SHOW_MAP') {
      nxtProps.fetchOffers();
    }
  }

  submitSort(values) {
    this.props.sortOffers(values);
  }

  filterChoice(event) {
    this.setState({
      selectedField: event.target.value,
    });
  }

  render() {
    if (this.props.browserFilter === 'SHOW_MAP') { return null; }
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div style={{ margin: '100px 20px 0px 20px' }}>
        <form
          onSubmit={handleSubmit(this.submitSort.bind(this))}
          style={{
            width: '100%',
            border: '1px solid #333',
            background: '#f9f9f9',
            padding: 16,
            margin: 16,
          }}
        >
          <Field onChange={this.filterChoice.bind(this)} name="selectForm" component={selectForm} />
          <SorterForm selectedField={this.state.selectedField} />
          <button type="submit">Submit</button>
          <button type="button" onClick={reset}>Clear</button>
        </form>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    itemSorted: state.sorter,
  };
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'sorter',
  })(Sorter),
);