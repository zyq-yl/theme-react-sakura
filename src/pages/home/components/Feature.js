import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FeatureWrapper, FeatureTitle} from '../style';
import {Row, Col} from 'antd';
import {actionCreators} from "../store";

const getrand = (m, n) => {
    return Math.floor(Math.random() * (n - m + 1)) + m;
};

const featureList = (props) => {
    const {featureList, ListImg} = props;
    const list = featureList.toJS();
    return (
        <Row className='top-feature-row' gutter={16}>
            {
                list.map((item, index) => {
                    return (
                        <Col className="top-feature-v2" key={index} xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div className='top-feature-item'>
                                <Link to={'/article/' + item.id}>
                                    <div className='img-box'>
                                        <img src={item.thumbnail || ListImg[getrand(0, ListImg.length - 1)].img}
                                             alt=""/>
                                    </div>
                                    <div className='info'>
                                        <h3 className='ellipsis'>{item.title}</h3>
                                        <p className='ellipsis-two'>{item.summary}</p>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    )
                })
            }
        </Row>
    )
};

class Feature extends PureComponent {
    render() {
        return (
            <FeatureWrapper>
                <FeatureTitle>
                    <h1><i className='iconfont icon-anchor'/><span> START:DASH!!</span></h1>
                </FeatureTitle>
                {featureList(this.props)}
            </FeatureWrapper>
        )
    }

    componentDidMount() {
        this.props.getFeature();
    }
}

const mapState = (state) => {
    return {
        featureList: state.getIn(['home', 'featureList']),
        ListImg: state.getIn(['image', 'ListImg'])
    }
};

const mapDispatch = (dispatch) => {
    return {
        getFeature() {
            dispatch(actionCreators.getFeature());
        }
    }
};

export default connect(mapState, mapDispatch)(Feature);
