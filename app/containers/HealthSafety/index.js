/**
 *
 * HealthSafety
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  FormGroup,
  Label,
  Grid,
  Row,
  Col,
  Panel,
  Table,
  Button,
  ButtonGroup,
  ButtonToolbar,
  SplitButton,
  DropdownButton,
  MenuItem,
  Pagination,
  Pager,
  PageItem,
  Alert,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
  Popover,
  Modal
} from 'react-bootstrap';

import { createHealthSafetyAction } from "./actions";
import Select from 'react-select';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHealthSafety from './selectors';
import reducer from './reducer';
import saga from './saga';
import {listHealthSafetyAction} from './actions';
import { styles } from '../../assets/styles/variables';

export class HealthSafety extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props){
    super(props)

    this.state = {
      ecn : [],
      mma: [],
      openModel: false,
      sma: [],
      location: '',
      lmc: '',
      lsc: '',
      
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.create(
      {
        ecn: this.state.ecn,
        mma: this.state.mma,
        sma: this.state.sma,
        location: this.state.location,
        lmc: this.state.lmc,
        lsc: this.state.lsc,
        projectId: this.props.projectId
      }
    )
    setTimeout(() => {
      this.setState ({
        'ecn': '',
        'mma': '',
        'sma': '',
        'location': '',
        'lmc': '',
        'lsc': ''
      })
      setTimeout(() => {
        this.close();
        
      }, 800);
    }, 500);
  }

  handleMutiChange = (selectedOption) => {
 
    this.setState({
      critialContacts: selectedOption
    });
  }

  componentDidMount (){
    this.props.listHealthSafety(this.props.projectId);
  }
  
  ECN = (ec) => {
    
    this.setState({
      ecn: ec
    })
  }
  MMA = (ec) => {
    
    this.setState({
      mma: ec
    })
  }
  SMA = (ec) => {
    
    this.setState({
      sma: ec
    })
  }
  

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  
  open = () => {
    this.setState({
      openModel: true,
    })
  }
  
  close = () => {
    this.setState({
      openModel: false,
    });
  }
  listHealth = () => {
    {console.log(this.props.healthSafety.list_healthsafety.healthsafety)}
    if (this.props.healthSafety && this.props.healthSafety.list_healthsafety && this.props.healthSafety.list_healthsafety.healthsafety && this.props.healthSafety.list_healthsafety.healthsafety.length > 0) {
      return this.props.healthSafety.list_healthsafety.healthsafety.map((c) => {
        return (
              <tr key={Math.random()}>
                <td>
                  {c.lmc}
                </td>
                <td>
                  {c.location}
                </td>
                <td>
                  {/* {this.renderMoc(c.moc)} */}
                </td>
              </tr>
            );
          });
        }
  }
  
  render() {
    return (
      <div>
        <Helmet>
          <title>HealthSafety</title>
          <meta name="description" content="Description of HealthSafety" />
        </Helmet>

        <Col md={12}>
            <div id="panelDemo8" className="panel panel-primary" >
                <div className="panel-heading" style={styles.primaryDark}  >
                  <button onClick={this.open} className="btn btn-success btn-block" style={{}}> Health & Safety </button>
                </div>

                { /* START table-responsive */}
                <Table id="table-ext-2" responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '120px' }}>LMC</th>
                            <th style={{width: '120px'}}>special Instruction </th>
                            <th style={{width: '120px'}}>Method of Communication </th>
                        </tr>
                    </thead>
                    <tbody>
                      {this.listHealth()}
                    </tbody>
                </Table>
                { /* END table-responsive */}
                {/* <div className="panel-footer">Panel Footer</div> */}
            </div>
        </Col>

        <Modal show={this.state.openModel} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Health and Safety</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" onChange={this.handleChange} onSubmit={this.handleSubmit} >
              <fieldset>

                <div className="form-group mb">
                  <label className="col-sm-2 col-sm-offset-1 control-label mb">Emergency Contact Numbers</label>
                  <Col sm={8}>
                    <Select.Creatable
                      name="ecn"
                      value={this.state.ecn}
                      onChange={this.ECN}
                      multi={true}

                    />
                  </Col>
                </div>

                <div className="form-group mb">
                  <label className="col-sm-2 col-sm-offset-1 control-label mb">Medical Members Assigned</label>
                  <Col sm={8}>
                    <Select.Creatable
                      name="mma"
                      value={this.state.mma}
                      onChange={this.MMA}
                      multi={true}

                    />
                  </Col>
                </div>

                <div className="form-group mb">
                  <label className="col-sm-2 col-sm-offset-1 control-label mb">Security Members Assigned</label>
                  <Col sm={8}>
                    <Select.Creatable
                      name="sma"
                      value={this.state.sma}
                      onChange={this.SMA}
                      multi={true}

                    />
                  </Col>
                </div>

                <div className="form-group mb">
                  <label className="col-sm-2 col-sm-offset-1 control-label mb"> Location of Medical</label>
                  <Col sm={8}>
                    <textarea
                      rows="5"
                      type="text"
                      name="location"
                      value={this.state.location}
                      className="form-control"
                      placeholder="Location of Medical"
                    />
                  </Col>
                </div>


                <div className="form-group mb">
                  <label className="col-sm-2 col-sm-offset-1 control-label mb"> Any medical considerations</label>
                  <Col sm={8}>
                    <textarea
                      rows="5"
                      type="text"
                      name="lmc"
                      value={this.state.lmc}
                      className="form-control"
                      placeholder="List of Any medical considerations"
                    />
                  </Col>
                </div>

                <div className="form-group mb">
                  <label className="col-sm-2 col-sm-offset-1 control-label mb"> Any Saftey Considerations</label>
                  <Col sm={8}>
                    <textarea
                      rows="5"
                      type="text"
                      name="lsc"
                      value={this.state.lsc}
                      className="form-control"
                      placeholder="List of Any Saftey Considerations"
                    />
                  </Col>
                </div>
              </fieldset>
              <button className="btn-block btn btn-success">Add Health & Safety</button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger" onClick={this.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

HealthSafety.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  healthSafety: makeSelectHealthSafety(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    create: (payload) => dispatch(createHealthSafetyAction(payload)),
    listHealthSafety: (payload) => dispatch(listHealthSafetyAction(payload))

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'healthSafety', reducer });
const withSaga = injectSaga({ key: 'healthSafety', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HealthSafety);
