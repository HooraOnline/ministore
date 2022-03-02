import View from "./View";
import React, {PureComponent} from "react";
//import styled from "styled-components";

/*let Spiner = styled.div`
 border-radius: 50%;
  width: 7em;
  height: 7em;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(227,38,38, 0.2);
  border-right: 1.1em solid rgba(227,38,38, 0.2);
  border-bottom: 1.1em solid rgba(227,38,38, 0.2);
  border-left: 1.1em solid #e32626;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
    `;*/
export default class FlatList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            EmptyComponentDisplay: 'none',

        };

        this.myRef = React.createRef();
        this.listRef = React.createRef();
        this.animationRequestId;


        this.dataList = [];
        this.pageIndex = 0;
        this.nextSkip = 0;
        this.pageSize = props.pageSize || 10;
    }

    componentDidMount() {
        setTimeout(() => this.setState({EmptyComponentDisplay: ''}), 500);

        setTimeout(() => {
                if (this.myRef.current) {
                    this.setState({
                        itemLeft: this.myRef.current.offsetLeft,
                        itemTop: this.myRef.current.offsetTop,
                        itemWidth: this.myRef.current.offsetWidth,
                    })
                }

            },

            0);
    }


    handlePagingOnScroll = (event) => {
        const scrolableDiv = event.target;
        this.props.onScroll && this.props.onScroll(scrolableDiv, scrolableDiv.scrollTop, scrolableDiv.scrollHeight, scrolableDiv.clientHeight)

        if (this.animationRequestId) {
            window.cancelAnimationFrame(this.animationRequestId);
        }
        let distanceFromEnd = scrolableDiv.scrollHeight - scrolableDiv.clientHeight - scrolableDiv.scrollTop;
        this.animationRequestId = window.requestAnimationFrame((t) => {
            if (distanceFromEnd < 1 && !this.props.loading) {
                this.pageIndex = this.pageIndex + 1;
                this.nextSkip = this.nextSkip + this.pageSize;
                let isLastPage = this.props.data.length < this.pageSize;
                this.dataList = [...this.dataList, ...this.props.data];
                this.props.onEndReached && this.props.onEndReached(this.nextSkip, isLastPage, this.nextPage, this.dataList.length, distanceFromEnd)
            }
        });
    }


    renderRows = (items,) => {
        const columnNumber = this.props.columnNumber || 1;
        return (
            <div style={this.props.listFormat === 'wrap' ? {
                /*  'display': 'grid',
                 'grid-template-columns':' repeat(3, 1fr)',
                 'grid-gap': 10,*/
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                overflow: this.props.overflow || 'auto',
                maxHeight: this.props.maxHeight, ...this.props.listStyle
            } : {
                flex: 1, display: 'flex', width: '100%',
                flexDirection: this.props.horizontal ? 'row' : 'column',
                alignItems: this.props.horizontal ? 'center' : undefined,
                overflow: this.props.overflow || 'auto',

                maxHeight: this.props.maxHeight, ...this.props.listStyle
            }}>
                {
                    items.map((item, index) => {
                        let key = item.id || index.toString();
                        return (
                            <div key={key} ref={this.myRef} style={{width: `${100 / columnNumber}%`}}>
                                <div style={{width: `100%`}}>
                                    {
                                        this.props.renderItem({
                                            item,
                                            index,
                                            itemWidth: this.myRef.current ? this.myRef.current.offsetWidth : undefined
                                        })
                                    }
                                </div>
                                <View>
                                    {
                                        this.props.ItemSeparatorComponent && this.props.ItemSeparatorComponent()
                                    }
                                </View>
                            </div>
                        )
                    })

                }
            </div>
        )
    }

    renderList = (data) => {

        if (!data || data.length === 0) {
            return null;
        }
        return this.renderRows(data);
    }


    render() {
        const {
            maxHeight,
            ListEmptyComponent = null,
            ItemSeparatorComponent,
            LoadingComponent,
            ListFooterComponent,
            loading,
            style,
            ListHeaderComponent
        } = this.props;
        const data = this.dataList.length > 0 ? [...this.dataList, ...this.props.data] : this.props.data;
        /* if(!data){
             return (
                <View style={{flex:1,alignItems:'center',marginTop:30}}> <Text>data not set</Text> </View>
             );
         }*/
        if ((!data || data.length === 0) && !loading) {
            return (
                <div style={{display: this.state.EmptyComponentDisplay}}>
                    {ListHeaderComponent}
                    {ListEmptyComponent}
                </div>
                // || <View style={{flex:1,alignItems:'center',marginTop:30}}> <Text>هیچ آیتمی وجود ندارد</Text> </View>
            );
        }


        return (
            <div onScroll={event => {
                this.props.onEndReached && this.handlePagingOnScroll(event);

            }} style={{
                width: '100%',
                overflowY: (this.props.overflow || 'auto'),
                position: 'relative',
                maxHeight: this.props.overflow ? undefined : maxHeight || global.height - 10,
            }}>
                <input style={{display: 'none'}} onChange={() => console.log(2)}/>
                <View style={[{style}, {
                    width: '100%',
                    justifyContent22: 'center',
                    alignItems22: 'center',
                    alignSelf: 'center'
                }]}>
                    {ListHeaderComponent}
                    <div ref={this.listRef} style={{width: '100%',}}>
                        {
                            this.renderList(data)
                        }
                    </div>

                    {loading && (
                        LoadingComponent || <View style={{
                            flex: 1,
                            width: '100%',
                            paddingHorizontal: 30,
                            marginBottom: 24,
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>
                            {/* <Text style={{flex:1,alignSelf:'center',textAlign:'center'}} >در حال دریافت ...</Text>*/}
                            {/*<Spiner/>*/}
                            {/*
                            <Skeleton animation="wave" style={{width:'100%',backgroundColor:bgWhite,height: 100,borderRadius:12}} />
                            <Skeleton animation="wave" style={{width:'100%' ,backgroundColor:bgWhite,height:100,borderRadius:12}} />
                            <Skeleton animation="wave" style={{width:'100%',backgroundColor:bgWhite,height:100,borderRadius:12}}/>
                          */}
                        </View>
                    )}
                    {ListFooterComponent}

                </View>
            </div>
        );
    }
}


